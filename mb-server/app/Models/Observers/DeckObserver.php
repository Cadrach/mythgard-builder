<?php

namespace App\Models\Observers;

use App\Models\Deck;
use App\Models\Helper;
use Illuminate\Support\Facades\DB;

class DeckObserver
{
    /**
     * Handle the deck "saved" event.
     *
     * @param  Deck  $deck
     * @return void
     */
    public function saved(Deck $deck)
    {
        //We must update the binaries
        $computedFields = Helper::resolveDeckComputedFields($deck->dck_cards);

        //Additional fields we will update
        $fields = array_merge($computedFields, [
            'dck_version' => "'0.16.2'",
            'dck_factions' => "''",
        ]);

        //Straighten everything
        $sql = [];
        foreach($fields as $key=>$value){
            $sql[] = "$key = $value";
        }

        //Update the line. WARNING: this is not protected so careful what you put there!
        DB::update("UPDATE {$deck->getTable()} SET " . implode(',', $sql) . " WHERE id={$deck->id}");
    }
}
