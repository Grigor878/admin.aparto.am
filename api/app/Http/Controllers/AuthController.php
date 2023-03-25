<?php
namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Validator;
use App\Models\User;
use App\Models\Employe;
use Illuminate\Support\Facades\Hash;
class AuthController extends Controller
{
    protected function respondWithToken($token)
	{
		return response()->json([
			'access_token' => $token,
			'token_type' => 'bearer',
			'expires_in' => auth('api')->factory()->getTTL() * 60 * 60 * 7,
		]);
	}
    /**
     * Register a new user
     */
    public function register(Request $request)
    {
        $v = Validator::make($request->all(), [
            'name' => 'required|min:3',
            'email' => 'required|email|unique:users',
            'password'  => 'required|min:3|confirmed',
        ]);
        if ($v->fails())
        {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }
        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(['status' => 'success'], 200);
    }
    /**
     * Login user and return a token
     */
    public function login(Request $request)
    {
        // $employe = new Employe;
        // $employe->type = 1;
        // $employe->name = "Grig";
        // $employe->surname = "test";
        // $employe->email = "grigsgog@gmail.com";
        // $employe->phone = 374999999;
        // $employe->password = Hash::make(123456);
        // $employe->save();

       $data = $request->all();

       $validate = Validator::make($data, [
           'email' => 'required|email',
           'password' => 'required|min:6',
       ]);

       if ($validate->fails()) {
           return response(['error' => $validate->errors()], 422);
       }
       $mailUser = $data['email'];
       $passwordUser = $data['password'];
       $employe = Employe::where('email', $mailUser)->first();
       if($employe) {
           if (Hash::check($passwordUser, $employe['password'])) {
            \Log::info($validate->validated());
               if (!$token = auth()->attempt($validate->validated())) {
                   \Log::info(auth()->user());
                   return response()->json(['error' => 'Unauthorized'], 401);
               }
               \Log::info(auth()->user());
               return $this->respondWithToken($token);
           }
           else {
               return response(['error' => ['both' => 'Incorrect Email or Password']], 422);
           }
       }

       return response(['error' => ['both' => 'Incorrect Email or Password']], 422);

        $credentials = ['email' => $request->username, 'password' => $request->password];
        if ($token = $this->guard()->attempt($credentials)) {
            return response()->json(['status' => 'success'], 200)->header('Authorization', $token);
        }
        return response()->json(['error' => 'login_error'], 401);
    }
    /**
     * Logout User
     */
    public function logout()
    {
        $this->guard()->logout();
        return response()->json([
            'status' => 'success',
            'msg' => 'Logged out Successfully.'
        ], 200);
    }
    /**
     * Get authenticated user
     */
    public function user(Request $request)
    {
        $user = User::find(Auth::user()->id);
        return response()->json([
            'status' => 'success',
            'data' => $user
        ]);
    }
    /**
     * Refresh JWT token
     */
    public function refresh()
    {
        if ($token = $this->guard()->refresh()) {
            return response()
                ->json(['status' => 'successs'], 200)
                ->header('Authorization', $token);
        }
        return response()->json(['error' => 'refresh_token_error'], 401);
    }
    /**
     * Return auth guard
     */
    private function guard()
    {
        return Auth::guard();
    }
}