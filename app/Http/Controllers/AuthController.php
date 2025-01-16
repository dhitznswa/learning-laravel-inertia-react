<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Mail\WelcomeMessageMail;
use Illuminate\Auth\Events\Registered;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class AuthController extends Controller
{
    public function signIn()
    {
        return inertia('Auth/SignIn');
    }

    public function signInAction(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return redirect()->intended('/');
        }

        return redirect()->back()->with('error', 'The provided credentials do not match our records. Please try again.');
    }

    public function signUp()
    {
        return inertia('Auth/SignUp');
    }

    public function signUpAction(Request $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
        ]);

        $data['password'] = Hash::make($data['password']);

        $user = User::create($data);

        event(new Registered($user));

        return redirect()->route('login')->with('success', 'Your account has been created. Please verify your email address.');
    }

    public function signOut()
    {
        Auth::logout();
        return redirect()->route('login');
    }
}
