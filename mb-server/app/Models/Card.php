<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    const RARITY_COMMON = 'common';
    const RARITY_UNCOMMON = 'uncommon';
    const RARITY_RARE = 'rare';
    const RARITY_MYTHIC = 'mythic';

    const TYPE_LANE_ENCHANTMENT = 'LaneEnchantment';
    const TYPE_CREATURE = 'Creature';
    const TYPE_SPELL = 'Spell';
    const TYPE_ARTIFACT = 'Artifact';

    protected $appends = ['card_image'];
    protected $casts = [
        'card_keywords' => 'array',
    ];

    public function getCardImageAttribute() {
        return strtolower($this->card_name_clean) . '.png';
    }

}
