<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Puzzle extends Model
{
    /**
     * Get the comments for the blog post.
     */
    public function user()
    {
        return $this->hasOne('App\User', 'id', 'ide_user');
    }
}
