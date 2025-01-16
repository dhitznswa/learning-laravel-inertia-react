<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;

Route::get('/', function () {
    return inertia('Homepage');
});

Route::get('/about', function () {
    sleep(2); // Simulate slow response
    return inertia('About', [
        'name' => 'John Doe',
        'age' => 30,
    ]);
});

Route::group(['middleware' => 'guest'], function () {
    Route::get('sign-in', [AuthController::class, 'signIn'])->name('login');
    Route::post('sign-in', [AuthController::class, 'signInAction'])->name('login.action');

    Route::get('sign-up', [AuthController::class, 'signUp'])->name('register');
    Route::post('sign-up', [AuthController::class, 'signUpAction'])->name('register.action');
});

Route::get('sign-out', [AuthController::class, 'signOut'])->name('logout');

Route::get('/email/verify', function () {
    return inertia('Auth/EmailVerify');
})->middleware('auth')->name('verification.notice');

Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {
    $request->fulfill();

    return redirect('/')->with('success', 'Email verified successfully');
})->middleware(['auth', 'signed'])->name('verification.verify');

Route::resource('/post', PostController::class)->middleware(['auth', 'verified']);
