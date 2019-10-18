<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Faction;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    protected function _dictionary($class, $fields, $prefix){
        foreach($fields as $field){
            $select[] = "$field as `" . str_replace($prefix, '', $field) . "`";
        }
        return $class::selectRaw(implode(', ', $select))->get();
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
//        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }

    public function getDictionaries(){
        return [
            'cards' => $this->_dictionary(Card::class, [
                'id',
                'id_rhino',
                'ide_faction',
                'card_rarity_index',
                'card_name',
                'card_name_export',
                'card_name_clean',
//                'card_image',
                'card_set',
                'card_type',
                'card_subtype',
                'card_rarity',
                'card_cost',
                'card_gems',
                'card_attack',
                'card_health',
                'card_keywords',
                'card_text',
                'card_text_flavor',
                'created_at',
                'updated_at',
            ], 'card_'),

            'factions' => $this->_dictionary(Faction::class, ['id', 'fac_code', 'fac_name'], 'fac_'),
        ];
    }
}
