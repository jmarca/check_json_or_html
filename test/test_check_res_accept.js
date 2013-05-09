/* global require console process it describe after before */

// these tests are for a user, but not one with admin privs

var should = require('should')

var superagent = require('superagent')
//var _ = require('lodash');
//var async = require('async');
var check_res_accept = require('../.')
var http = require('http')
var express = require('express')
var env = process.env
var testhost = env.LINKS_TEST_HOST || '127.0.0.1'
var testport = env.LINKS_TEST_PORT || 3001

describe ('basic functionality', function(){
    var app,server;
    var message = {p:'this is a paragraph'
                  ,e:'this is not an error'}

    before(
        function(done){
            app = express()
            app.set('views', __dirname + '/views');
            app.set('view engine', 'jade');

            app.get('/'
                   ,function(req,res,next){
                        return check_res_accept({'template':'webpage'
                                                ,'response':message}
                                               ,req,res,next)
                    })
            server=http
                   .createServer(app)
                   .listen(testport,testhost,done)

        })
    after(function(done){
        server.close(done)
    })

    it('should handle html requests',function(done){
        superagent.get(testhost+':'+testport+'/')
        //.set('Accept', 'application/json')
        .set('Accept', 'text/html')
        .end(function(e,r){
            should.not.exist(e)
            should.exist(r)
            r.should.have.property('text','<!DOCTYPE html><html><head><title>title!</title></head><body style="padding-top:40px"><p>this is a paragraph</p><p>this is not an error</p></body></html>')
            done()
        })
    })
    it('should handle html requests',function(done){
        superagent.get(testhost+':'+testport+'/')
        .set('Accept', 'application/json')
        //.set('Accept', 'text/html')
        .end(function(e,r){
            should.not.exist(e)
            should.exist(r)
            r.should.have.property('body')
            r.body.should.have.property('e',message.e)
            r.body.should.have.property('p',message.p)
            done()
        })

    })
})
