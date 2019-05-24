import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
declare var $: any;
// service auth
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-listusers',
  templateUrl: './listusers.component.html',
  styleUrls: ['./listusers.component.css']
})
export class ListusersComponent implements OnInit {

  // list data ws user
  listUser: {};

  constructor(private http: Http, private formBuilder: FormBuilder, private userService: UserService, private router: Router) {
    this.getAllData();
  }

  ngOnInit() {
    (function(window, document, undefined) {

      var factory = function($, DataTable) {
        "use strict";
    
        $('.search-toggle').click(function() {
          if ($('.hiddensearch').css('display') == 'none')
            $('.hiddensearch').slideDown();
          else
            $('.hiddensearch').slideUp();
        });
    
        /* Set the defaults for DataTables initialisation */
        $.extend(true, DataTable.defaults, {
          dom: "<'hiddensearch'f'>" +
            "tr" +
            "<'table-footer'lip'>",
          renderer: 'material'
        });
    
        /* Default class modification */
        $.extend(DataTable.ext.classes, {
          sWrapper: "dataTables_wrapper",
          sFilterInput: "form-control input-sm",
          sLengthSelect: "form-control input-sm"
        });
    
        /* Bootstrap paging button renderer */
        DataTable.ext.renderer.pageButton.material = function(settings, host, idx, buttons, page, pages) {
          var api = new DataTable.Api(settings);
          var classes = settings.oClasses;
          var lang = settings.oLanguage.oPaginate;
          var btnDisplay, btnClass, counter = 0;
    
          var attach = function(container, buttons) {
            var i, ien, node, button;
            var clickHandler = function(e) {
              e.preventDefault();
              if (!$(e.currentTarget).hasClass('disabled')) {
                api.page(e.data.action).draw(false);
              }
            };
    
            for (i = 0, ien = buttons.length; i < ien; i++) {
              button = buttons[i];
    
              if ($.isArray(button)) {
                attach(container, button);
              } else {
                btnDisplay = '';
                btnClass = '';
    
                switch (button) {
    
                  case 'first':
                    btnDisplay = lang.sFirst;
                    btnClass = button + (page > 0 ?
                      '' : ' disabled');
                    break;
    
                  case 'previous':
                    btnDisplay = '<i class="material-icons">chevron_left</i>';
                    btnClass = button + (page > 0 ?
                      '' : ' disabled');
                    break;
    
                  case 'next':
                    btnDisplay = '<i class="material-icons">chevron_right</i>';
                    btnClass = button + (page < pages - 1 ?
                      '' : ' disabled');
                    break;
    
                  case 'last':
                    btnDisplay = lang.sLast;
                    btnClass = button + (page < pages - 1 ?
                      '' : ' disabled');
                    break;
    
                }
    
                if (btnDisplay) {
                  node = $('<li>', {
                      'class': classes.sPageButton + ' ' + btnClass,
                      'id': idx === 0 && typeof button === 'string' ?
                        settings.sTableId + '_' + button : null
                    })
                    .append($('<a>', {
                        'href': '#',
                        'aria-controls': settings.sTableId,
                        'data-dt-idx': counter,
                        'tabindex': settings.iTabIndex
                      })
                      .html(btnDisplay)
                    )
                    .appendTo(container);
    
                  settings.oApi._fnBindAction(
                    node, {
                      action: button
                    }, clickHandler
                  );
    
                  counter++;
                }
              }
            }
          };
    
          // IE9 throws an 'unknown error' if document.activeElement is used
          // inside an iframe or frame. 
          var activeEl;
    
          try {
            // Because this approach is destroying and recreating the paging
            // elements, focus is lost on the select button which is bad for
            // accessibility. So we want to restore focus once the draw has
            // completed
            activeEl = $(document.activeElement).data('dt-idx');
          } catch (e) {}
    
          attach(
            $(host).empty().html('<ul class="material-pagination"/>').children('ul'),
            buttons
          );
    
          if (activeEl) {
            $(host).find('[data-dt-idx=' + activeEl + ']').focus();
          }
        };
    
        /*
         * TableTools Bootstrap compatibility
         * Required TableTools 2.1+
         */
        if (DataTable.TableTools) {
          // Set the classes that TableTools uses to something suitable for Bootstrap
          $.extend(true, DataTable.TableTools.classes, {
            "container": "DTTT btn-group",
            "buttons": {
              "normal": "btn btn-default",
              "disabled": "disabled"
            },
            "collection": {
              "container": "DTTT_dropdown dropdown-menu",
              "buttons": {
                "normal": "",
                "disabled": "disabled"
              }
            },
            "print": {
              "info": "DTTT_print_info"
            },
            "select": {
              "row": "active"
            }
          });
    
          // Have the collection use a material compatible drop down
          $.extend(true, DataTable.TableTools.DEFAULTS.oTags, {
            "collection": {
              "container": "ul",
              "button": "li",
              "liner": "a"
            }
          });
        }
    
      }; // /factory
    
     
    
    })(window, document);
    
    $(document).ready(function() {
      $('#datatable').dataTable({
        "oLanguage": {
          "sStripClasses": "",
          "sSearch": "",
          "sSearchPlaceholder": "Enter Keywords Here",
          "sInfo": "_START_ -_END_ of _TOTAL_",
          "sLengthMenu": '<span>Rows per page:</span><select class="browser-default">' +
            '<option value="10">10</option>' +
            '<option value="20">20</option>' +
            '<option value="30">30</option>' +
            '<option value="40">40</option>' +
            '<option value="50">50</option>' +
            '<option value="-1">All</option>' +
            '</select></div>'
        },
        bAutoWidth: false
      });
    });
  }

  // obtain all data from the register users
  getAllData() {
    // send to search api backend all users
    this.userService.getAllDataUsers()
      .subscribe(data => {
        // populate list json users
        //console.log(data);
        this.listUser = data.rows;
      });
  }
  // redirect to create user
  createUser() {
    this.router.navigate(['/createuser']);
  }
  // redirect to update user
  updateUser(id) {
    // almacenamos el id
    localStorage.setItem('idUser', id);
    this.router.navigate(['/updateuser']);
  }
  // delete user
  deleteUser(id) {
    // send to api backend delete user for id
    localStorage.Id
    this.userService.deleteUsers(id)
      .subscribe(data => {
        if (data.respuesta === 'Success') {
          // redirect
          location.reload();
        }
      });
  }
}
