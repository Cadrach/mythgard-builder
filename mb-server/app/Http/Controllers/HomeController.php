<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\Faction;
use App\Models\Path;
use App\Models\Power;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    protected function _dictionary($class, $fields, $prefix){
        foreach($fields as $field){
            $select[] = "$field as `" . str_replace($prefix, '', $field) . "`";
        }
        return $class::selectRaw(implode(', ', $select));
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
     * Homepage
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        //Redirect to the home of the React App
        return redirect(env('EXTERNAL_SERVER_URL'));
    }

    public function getDictionaries(){
        return [
            'user' => $this->_user(),
            'cards' => $this->_dictionary(Card::class, [
                'id',
                'id_rhino',
                'ide_faction',
                'card_rarity_index',
                'card_name',
                'card_name_export',
                'card_name_clean',
                'card_image',
                'card_set',
                'card_type',
                'card_subtype',
                'card_rarity',
                'card_max_in_deck',
                'card_cost',
                'card_gems',
                'card_attack',
                'card_health',
                'card_keywords',
                'card_text',
                'card_text_flavor',
                'created_at',
                'updated_at',
            ], 'card_')
                ->orderBy('ide_faction')
                ->orderBy('card_cost')
                ->orderBy('card_name')
                ->get(),

            'factions' => $this->_dictionary(Faction::class, ['id', 'fac_code', 'fac_name'], 'fac_')->get(),
            'powers' => $this->_dictionary(Power::class, ['id', 'pow_name', 'pow_icon', 'pow_image',], 'pow_')->get(),
            'paths' => $this->_dictionary(Path::class, ['id', 'pth_name', 'pth_icon', 'pth_image',], 'pth_')->get(),
        ];
    }
}
