<?php

namespace App\Console\Commands;

use App\Models\Home;
use Illuminate\Console\Command;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;

class AddHomeSerach extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'generate-search';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        Home::query()->chunk(100, function ($homes) {
            $updates = [];

            foreach ($homes as $home) {
                $am = json_decode($home->am, true);
                $ru = json_decode($home->ru, true);
                $en = json_decode($home->en, true);

                $searchable = implode(' ', [
                    data_get($am, '0.fields.2.value', ''),
                    data_get($ru, '0.fields.2.value', ''),
                    data_get($en, '0.fields.2.value', ''),
                    data_get($am, '1.fields.0.communityStreet.value', ''),
                    data_get($ru, '1.fields.0.communityStreet.value', ''),
                    data_get($en, '1.fields.0.communityStreet.value', ''),
                    data_get($am, '9.fields.1.value', ''),
                    data_get($am, '9.fields.2.option.0.value', ''),
                    data_get($am, '9.fields.2.option.1.value', ''),
                    data_get($am, '9.fields.2.option.2.value', ''),
                    data_get($am, '9.fields.2.option.3.value', ''),
                    data_get($am, '9.fields.0.value', ''),
                    data_get($am, '11.fields.0.value', ''),
                    data_get($ru, '11.fields.0.value', ''),
                    data_get($en, '11.fields.0.value', ''),
                    data_get($am, '11.fields.1.value', ''),
                    data_get($ru, '11.fields.1.value', ''),
                    data_get($en, '11.fields.1.value', ''),
                    $home->id,
                    $home->home_id,
                ]);

                $updates[] = [
                    'id' => $home->id,
                    'searchable' => $searchable,
                ];
            }

            foreach ($updates as $update) {
                DB::table('homes')
                    ->where('id', $update['id'])
                    ->update(['searchable' => $update['searchable']]);
            }
        });
        return Command::SUCCESS;
    }
}
