import $ from 'jquery'; 
import 'jquery-ui/themes/base/theme.css';
import 'jquery-ui/themes/base/selectable.css';
import 'jquery-ui/ui/core';
import 'jquery-ui/ui/widgets/sortable';

$.fn.fieldChooser = function (data, options)
    {
        var _options = options;
        if(typeof options !== 'object'){
            _options = {};
        }
        var isClone = typeof _options.clone === "boolean" ? _options.clone : false;
        var headingDestination1 = typeof _options.firstDestinationHeading === "string" ? _options.firstDestinationHeading : "";
        var headingDestination2 = typeof _options.secondDestinationHeading === "string" ? _options.secondDestinationHeading : "";
        var sourceHeading = typeof _options.sourceHeading === "string" ? _options.sourceHeading : "";;
        var sourceKey = typeof _options.sourceKey === "string" ? _options.sourceKey : "source";;
        var keyDestination1 = typeof _options.firstDestinationKey === "string" ? _options.firstDestinationKey : "destination1";
        var keyDestination2 = typeof _options.secondDestinationKey === "string" ? _options.secondDestinationKey : "destination2";
        

        var _data = data.map(function(el){
            el.id = getId();
            if(Array.isArray(el.in)){
                if(isClone){
                    if(el.in.length === 0){
                        el.in.push(0)
                    }
                    else {
                        if(!el.in.includes(0)) {
                            el.in.push(0)
                        }
                    }
                }
                else {
                    if(el.in.length === 0){
                        el.in.push(0)
                    }
                    else {
                        el.in = [el.in[0]];
                    }
                }
                
            }
            else{
                el.in = [0];
            }
            return el;
        });

        var initElement = this;
        this.addClass('jqplugin-master-container');
        initElement.empty();
        initElement.append(`
            <div class="jqplugin-source-parent-container jqplugin-parent-container">
                ${sourceHeading === '' ? '' : `<div class="jqplugin-heading-container">${sourceHeading}</div>`}
                <div class="jqplugin-search-container">
                    <input type="text" placeholder="Search" class="jqplugin-search-input" />
                </div>
                <div class="jqplugin-source-container jqplugin-container"></div>
                <div class="jqplugin-source-selectall">
                    Select All
                </div>
            </div>
        `);
        initElement.append(`
            <div class="jqplugin-first-destination-parent-container jqplugin-parent-container">
                ${headingDestination1 === '' ? '' : `<div class="jqplugin-heading-container">${headingDestination1}</div>`}
                <div class="jqplugin-search-container">
                    <input type="text" placeholder="Search" class="jqplugin-search-input"/>
                </div>
                <div class="jqplugin-first-destination-container jqplugin-container"></div>
                <div class="jqplugin-container-deleteall">
                    Delete All
                </div>
            </div>
        `);
        initElement.append(`
            <div class="jqplugin-second-destination-parent-container jqplugin-parent-container">
                ${headingDestination2 === '' ? '' : `<div class="jqplugin-heading-container">${headingDestination2}</div>`}
                <div class="jqplugin-search-container">
                    <input type="text" placeholder="Search" class="jqplugin-search-input" />
                </div>
                <div class="jqplugin-second-destination-container jqplugin-container"></div>
                <div class="jqplugin-container-deleteall">
                    Delete All
                </div>
            </div>
        `);
        
        var sourceDiv = initElement.find(".jqplugin-source-container");
        var firstDestination = initElement.find(".jqplugin-first-destination-container");
        var secondDestination = initElement.find(".jqplugin-second-destination-container");

        function getId(length = 20) {
            var result           = '';
            var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < length; i++ ) {
               result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            return result;
        }

        function modifyItemObject(data, id, moveTo, moveFrom){
            return data.map(function(el){
                if(el.id === id){
                    if(Array.isArray(el.in)){

                        if(moveTo === 0){
                            var index = el.in.indexOf(moveFrom);
                            if(index !== -1){
                                el.in.splice(index, 1);
                            }
                        }

                        if(!el.in.includes(moveTo)){
                            if(isClone){
                                el.in.push(moveTo);
                            }
                            else {
                                el.in = [moveTo];
                            }
                        }

                    }
                    else{
                        el.in = [moveTo];
                    }
                }
                return el;
            });
        }

        function setData(data){
            _data = data;
        }
        function getData(){
            return _data;
        }

        function appendInContainer(data, source, c, showDelete){
            var deleteIcon = `<svg class="jqpn-listitem-text-svg" viewBox="-47 0 512 512" xmlns="http://www.w3.org/2000/svg"><path d="m416.875 114.441406-11.304688-33.886718c-4.304687-12.90625-16.339843-21.578126-29.941406-21.578126h-95.011718v-30.933593c0-15.460938-12.570313-28.042969-28.027344-28.042969h-87.007813c-15.453125 0-28.027343 12.582031-28.027343 28.042969v30.933593h-95.007813c-13.605469 0-25.640625 8.671876-29.945313 21.578126l-11.304687 33.886718c-2.574219 7.714844-1.2695312 16.257813 3.484375 22.855469 4.753906 6.597656 12.445312 10.539063 20.578125 10.539063h11.816406l26.007813 321.605468c1.933594 23.863282 22.183594 42.558594 46.109375 42.558594h204.863281c23.921875 0 44.175781-18.695312 46.105469-42.5625l26.007812-321.601562h6.542969c8.132812 0 15.824219-3.941407 20.578125-10.535157 4.753906-6.597656 6.058594-15.144531 3.484375-22.859375zm-249.320312-84.441406h83.0625v28.976562h-83.0625zm162.804687 437.019531c-.679687 8.402344-7.796875 14.980469-16.203125 14.980469h-204.863281c-8.40625 0-15.523438-6.578125-16.203125-14.980469l-25.816406-319.183593h288.898437zm-298.566406-349.183593 9.269531-27.789063c.210938-.640625.808594-1.070313 1.484375-1.070313h333.082031c.675782 0 1.269532.429688 1.484375 1.070313l9.269531 27.789063zm0 0"/><path d="m282.515625 465.957031c.265625.015625.527344.019531.792969.019531 7.925781 0 14.550781-6.210937 14.964844-14.21875l14.085937-270.398437c.429687-8.273437-5.929687-15.332031-14.199219-15.761719-8.292968-.441406-15.328125 5.925782-15.761718 14.199219l-14.082032 270.398437c-.429687 8.273438 5.925782 15.332032 14.199219 15.761719zm0 0"/><path d="m120.566406 451.792969c.4375 7.996093 7.054688 14.183593 14.964844 14.183593.273438 0 .554688-.007812.832031-.023437 8.269531-.449219 14.609375-7.519531 14.160157-15.792969l-14.753907-270.398437c-.449219-8.273438-7.519531-14.613281-15.792969-14.160157-8.269531.449219-14.609374 7.519532-14.160156 15.792969zm0 0"/><path d="m209.253906 465.976562c8.285156 0 15-6.714843 15-15v-270.398437c0-8.285156-6.714844-15-15-15s-15 6.714844-15 15v270.398437c0 8.285157 6.714844 15 15 15zm0 0"/></svg>`;
            source.append(`
                        <div class="jqpn-listitem ${c}" data-id="${data.id}">
                            <span class="jqpn-listitem-text">${data.label}</span>
                            ${ showDelete ? `<span class='jqpn-listitem-delete'>${deleteIcon}</span>` : ''}
                        </div>`);
        }

        function buildData(data){
            sourceDiv.empty();
            firstDestination.empty();
            secondDestination.empty();
            _data.forEach(element => {
                if(!element.in || element.in.includes(0)){
                    appendInContainer(element, sourceDiv, 'jqpn-source-listitem', false)
                }
                if(element.in && element.in.includes(1)){
                    appendInContainer(element, firstDestination, 'jqpn-first-listitem', true)
                }
                if(element.in && element.in.includes(2)){
                    appendInContainer(element, secondDestination, 'jqpn-second-listitem', true)
                }
            });
            initSearch()
        }

        function initSortable(){
            var _selectorInitiator = ".jqplugin-source-container, .jqplugin-first-destination-container, .jqplugin-second-destination-container";
            
            initElement.find(_selectorInitiator).sortable({
                connectWith: _selectorInitiator,
                delay: 150,
                revert: 0,
                helper: function (e, item) {
                    if (!item.hasClass('jqpn-selected')) {
                        item.addClass('jqpn-selected').siblings().removeClass('jqpn-selected');
                    }
                    var elements = item.parent().children('.jqpn-selected').clone();
                    item.data('multidrag', elements)
                    var helper = $('<div/>');
                    return helper.append(elements);
                },
                receive: function(e, ui){
                    var elements = ui.item.data('multidrag');
                    var receiverIndex;
                    var senderIndex;

                    if(ui.item.hasClass("jqpn-source-listitem")){
                        senderIndex = 0;
                    }
                    else if (ui.item.hasClass("jqpn-first-listitem")){
                        senderIndex = 1;
                    }
                    else if (ui.item.hasClass("jqpn-second-listitem")){
                        senderIndex = 2;
                    }
                    else{
                        return;
                    }


                    if($(this).hasClass("jqplugin-source-container")){
                        receiverIndex = 0;
                    }
                    else if ($(this).hasClass("jqplugin-first-destination-container")){
                        receiverIndex = 1;
                    }
                    else if ($(this).hasClass("jqplugin-second-destination-container")){
                        receiverIndex = 2;
                    }
                    else{
                        return;
                    }
                    elements.each(function(el){
                        var id = $(this).attr('data-id');
                        var updatedData = modifyItemObject(getData(), id, receiverIndex, senderIndex);
                        setData(updatedData);
                    });
                    ui.item.after(elements).remove();
                    buildData(getData());
                }
            
            });
        }

        function initSelectHandler(){
            initElement.on('click', '.jqpn-listitem', function (e) {
                if (e.ctrlKey || e.metaKey) {
                    $(this).toggleClass("jqpn-selected");
                } else {
                    $(this).addClass("jqpn-selected").siblings().removeClass('jqpn-selected');
                }
            });
        }

        function deleteFn(id, targetIndex){
            var modifiedData = getData().map(function(el){
                if(el.id === id && Array.isArray(el.in) && el.in.includes(targetIndex)){
                    var index = el.in.indexOf(targetIndex);
                    el.in.splice(index, 1);
                    if(!el.in.includes(0)) {
                        el.in.push(0);
                    }
                }
                return el;
            });
            setData(modifiedData);
        }

        function bindDeleteHandlers(){
            [firstDestination, secondDestination].forEach(function(des, desIndex){
                var targetIndex = desIndex+1;
                des.on("click", ".jqpn-listitem-delete", function(){
                    var id = $(this).closest(".jqpn-listitem").attr("data-id");
                    deleteFn(id, targetIndex);
                    buildData(getData());
                });
            })
        }

        function initSearchHander() {
            initElement.find(".jqplugin-search-input").on("keyup", function(){
                var val = this.value.toLowerCase();
                var targetEl = $(this).closest(".jqplugin-parent-container").find(".jqplugin-container");
                targetEl.find(".jqpn-listitem").each(function(){
                    if($(this).find(".jqpn-listitem-text").html().toLowerCase().indexOf(val) !== -1){
                        $(this).show().removeClass("jqpn-listitem-hidden");
                    }
                    else{
                        $(this).hide().addClass("jqpn-listitem-hidden");
                    }
                });
            })
        }

        function initSearch() {
            initElement.find(".jqplugin-search-input").keyup();
        }

        function initSelectAll() {
            initElement.find(".jqplugin-source-selectall").on("click", function(){
                var listItems = sourceDiv.find(".jqpn-listitem").not(".jqpn-listitem-hidden");
                var selected = sourceDiv.find(".jqpn-listitem.jqpn-selected").not(".jqpn-listitem-hidden").length;
                if(selected === 0){
                    listItems.addClass("jqpn-selected");
                }
                else{
                    listItems.removeClass("jqpn-selected");
                }
            });
        }

        function initDeleteAll() {
            initElement.find(".jqplugin-container-deleteall").on("click", function(){
                var containerDiv = $(this).closest(".jqplugin-parent-container").find(".jqplugin-container");
                var targetIndex = containerDiv.hasClass("jqplugin-first-destination-container") ? 1 : 2;
                var allItems = containerDiv.find(".jqpn-listitem").not(".jqpn-listitem-hidden");
                allItems.each(function(){
                    var itemId = $(this).attr("data-id");
                    deleteFn(itemId, targetIndex);
                })
                buildData(getData());
            })
        }
        
        bindDeleteHandlers();
        initSortable();
        initSelectHandler();
        buildData(getData());
        initSearchHander();
        initSelectAll();
        initDeleteAll();

        return {
            value: function(){
                var _o = {
                    [sourceKey]: [],
                    [keyDestination1]: [],
                    [keyDestination2]: []
                };
                var d = getData();
                d.forEach(function(o){
                    var __o = {
                        value: o.value,
                        label: o.label
                    };
                    if(o.in.includes(0)){
                        _o[sourceKey].push(__o)
                    }
                    if(o.in.includes(1)){
                        _o[keyDestination1].push(__o)
                    }
                    if(o.in.includes(2)){
                        _o[keyDestination2].push(__o)
                    }
                })
                return _o;
            }
        }
    }
