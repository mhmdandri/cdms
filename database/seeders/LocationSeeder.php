<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $zone = 'EVERYELLOW';
        $rows = 1;
        $column = 5;
        for ($i = 1; $i <= $column; $i++) {
            DB::table('locations')->insert([
                'zone' => $zone,
                'rows' => $rows,
                'columns' => $i
            ]);
        }
    }
}
