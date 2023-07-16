<?php

namespace App\Jobs;

use App\Models\Home;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Carbon\Carbon;

class CheckInactive implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        \Log::info(Carbon::now());
        $dateNow = Carbon::now()->format('Y-m-d');
        \Log::info(Home::whereDate('inactive_at', $dateNow)->select('id')->get());
        Home::whereDate('inactive_at', $dateNow)->update(['status' => Home::STATUS_APPROVED]);
        return true;
    }
}
