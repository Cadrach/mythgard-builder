<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Deck extends Model
{
    protected $hidden = [
        'dck_bin_common',
        'dck_bin_uncommon',
        'dck_bin_rare',
        'dck_bin_mythic',
    ];

    protected $casts = [
        'dck_factions' => 'array',
        'dck_cards' => 'array',
    ];
}
