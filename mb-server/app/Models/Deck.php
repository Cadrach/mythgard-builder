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
        'test_dck_bin_common',
        'test_dck_bin_uncommon',
        'test_dck_bin_rare',
        'test_dck_bin_mythic',
    ];

    protected $fillable = [
        'ide_path',
        'ide_power',
        'dck_name',
        'dck_public',
        'dck_description',
        'dck_cards',
    ];

    protected $casts = [
        'dck_factions' => 'array',
        'dck_cards' => 'array',
        'dck_public' => 'boolean',
    ];

    /**
     * Get the comments for the blog post.
     */
    public function user()
    {
        return $this->hasOne('App\User', 'id', 'ide_user');
    }
}
