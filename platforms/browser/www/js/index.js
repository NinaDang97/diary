/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        ///////////////////////////////////////////
        ////////LOCALSTORAGE starts from here//////
        ///////////////////////////////////////////
        
        var storage = window.localStorage;
        var count = 0;
        $('#btnsave').click(saveLocalStorage);
        $('#btnclear').click(clearLocalStorage);
        storage.clear();
        
        function saveLocalStorage(){   
            var dataObj = {date : $('#date').val(), place : $('#place').val(), description : $('#description').val()};
            storage.setItem(count, JSON.stringify(dataObj));   
            var htmlStr = "";       
            for(var i = count; i < storage.length; i++){
                var todoItem = storage.getItem(storage.key(i));
                var item = JSON.parse(todoItem);
                
                htmlStr += "<li>" + item.date + ": " + item.place + " - " + item.description +"<button class='delete ui-btn ui-icon-delete ui-btn-icon-right ui-btn-icon-notext ui-nodisc-icon ui-alt-icon ui-btn-inline'>Delete</button></li>";
                
            }
			count++;
            htmlStr += "</ul>";
            $("#datalist").append(htmlStr);
			
            $(".delete").click(function(event){
                var itemIndex = $(this).parent().index;
				$(this).parent().hide();
				storage.removeItem(itemIndex);
				
            });
        }
        
        function clearLocalStorage(){
            storage.clear();
             var htmlStr = "<ul id='datalist' data-role='listview'>";
            $("#datalist").empty();
            
            for(var i = 0; i < storage.length; i++){
                var todoItem = storage.getItem(storage.key(i));
                var item = JSON.parse(todoItem);
                
                htmlStr += "<li>" + item.date + ": " + item.place + " - " + item.description +"</li>";
                
            }
            htmlStr += "</ul>";
            $("#listItem").html(htmlStr);
            
        }
        
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        
    }
};
