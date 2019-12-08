<?php

namespace App\Http\Controllers;

use App\Models\Helper;
use App\Models\Puzzle;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PuzzleController extends Controller
{

    /**
     * Get list of decks
     * @return mixed
     */
    public function getList(Request $request){
        //Basic requests
        $decks = Puzzle::where('pzl_public','=',1)
            ->with('user:id,name,image');

        //Sorting
        $sorter = $request->get('sorter');
        $sorter = isset($sorter['field']) ? $sorter : ['field' => 'updated_at', 'order' => 'descend'];

        return $decks
            ->orderBy($sorter['field'], $sorter['order'] == 'descend' ? 'desc':'asc')
            ->paginate(10);
    }
}
