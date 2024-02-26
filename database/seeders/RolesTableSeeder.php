<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
use App\Models\User;

class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $adminRole = Role::firstOrCreate(
            ['name' => 'ROLE_ADMIN'],
            ['normalized_name' => 'ADMINISTRATOR']
        );
        $userRole = Role::firstOrCreate(
            ['name' => 'ROLE_USER'],
            ['normalized_name' => 'USER']
        );

        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            ['name' => 'Admin User', 'password' => bcrypt('password')]
        )->roles()->attach($adminRole);

        User::firstOrCreate(
            ['email' => 'user@example.com'],
            ['name' => 'Regular User', 'password' => bcrypt('password')]
        )->roles()->attach($userRole);
    }
}
