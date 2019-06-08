<!doctype html>
@extends("layouts/main")
@section("body-section")
    <div id="app">
                <navbar></navbar>
                <router-view></router-view>
    </div>
    <script src="{{ asset('js/app.js') }}"></script>
@endsection
