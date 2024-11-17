<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('homes', function (Blueprint $table) {
            $table->id();
            $table->integer('employee_id')->nullabe();
            $table->text('photo')->nullabe();
            $table->text('file')->nullabe();
            $table->text('keywords')->nullabe();
            $table->string('status')->nullabe();
            $table->longText('am')->nullabe();
            $table->longText('ru')->nullabe();
            $table->longText('en')->nullabe();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('homes');
    }
};
