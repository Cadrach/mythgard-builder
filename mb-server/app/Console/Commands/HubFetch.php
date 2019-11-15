<?php

namespace App\Console\Commands;

use GuzzleHttp\Client;
use Illuminate\Console\Command;

class HubFetch extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hubfetch';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        //
        $guzzle = new Client([
            'base_uri' => 'https://mythgardhub.com',
            'verify' => false,
            'timeout'  => 5.0,
            'headers' => [
                'content-type' => 'application/json',
            ],
        ]);

        $folder = storage_path('hub_data');
        @mkdir($folder);
        for($i=1; $i<1200; $i++){
            $file = "$folder/$i.json";
            if( ! file_exists($file)){
                echo "Fetch $i\n";
                $response1 = $guzzle->post('/graphql', [
                    'body' => '[{"operationName":"deck","variables":{"id":'.$i.'},"query":"query deck($id: Int!) {\n  deck(id: $id) {\n    id\n    name\n    author {\n      id\n      username\n      __typename\n    }\n    power {\n      id\n      name\n      __typename\n    }\n    path {\n      id\n      name\n      __typename\n    }\n    deckPreviews {\n      nodes {\n        deckName\n        deckCreated\n        factions\n        essenceCost\n        votes\n        deck {\n          id\n          author {\n            username\n            id\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"}]',
                ]);
                $response2 = $guzzle->post('/graphql', [
                    'body' => '[{"operationName":null,"variables":{"id":'.$i.'},"query":"query ($id: Int!) {\n  deck(id: $id) {\n    id\n    name\n    cardDecks {\n      nodes {\n        quantity\n        card {\n          name\n          id\n          mana\n          gem\n          supertype\n          rarity\n          cardFactions {\n            nodes {\n              faction {\n                name\n                __typename\n              }\n              __typename\n            }\n            __typename\n          }\n          __typename\n        }\n        __typename\n      }\n      __typename\n    }\n    __typename\n  }\n}\n"}]',
                ]);
                $bodyDeck = $response1->getBody();
                $bodyCards = $response2->getBody();
                file_put_contents($file, "{\"deck\":$bodyDeck,\"cards\":$bodyCards}");
            }
        }

    }
}
