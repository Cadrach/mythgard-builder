<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    const RARITY_COMMON = 'common';
    const RARITY_UNCOMMON = 'uncommon';
    const RARITY_RARE = 'rare';
    const RARITY_MYTHIC = 'mythic';

    const TYPE_CREATURE = 'Creature';
    const TYPE_SPELL = 'Spell';
    const TYPE_LANE_ENCHANTMENT = 'LaneEnchantment';
    const TYPE_ARTIFACT = 'Artifact';

    protected static $constants = null;

    protected static $maxByRarity = [
        self::RARITY_COMMON => 4,
        self::RARITY_UNCOMMON => 3,
        self::RARITY_RARE => 2,
        self::RARITY_MYTHIC => 1,
    ];

    protected static $essenceCostByRarity = [
        self::RARITY_COMMON => 50,
        self::RARITY_UNCOMMON => 100,
        self::RARITY_RARE => 500,
        self::RARITY_MYTHIC => 2400,
    ];

    protected $casts = [
        'card_keywords' => 'array',
    ];

    public static function getMaxByRarity(){
        return self::$maxByRarity;
    }

    public static function getEssenceCostByRarity(){
        return self::$essenceCostByRarity;
    }

    public static function getConstants(){
        if(self::$constants === null){
            self::$constants = [];
            $ignored = ['CREATED_AT', 'UPDATED_AT'];
            $class = new \ReflectionClass(self::class);
            foreach($class->getConstants() as $constant => $value){
                if( ! in_array($constant, $ignored)){
                    self::$constants[explode('_', $constant)[0]][$constant] = $value;
                }
            }
        }
        return self::$constants;
    }

}
