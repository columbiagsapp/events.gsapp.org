// $Id: dragndrop_uploads.js,v 1.2.2.13 2010/01/08 09:59:34 deciphered Exp $

(function($) {
  $(document).ready(function() {
    _init = function() {
      // Hide upload Widget.
      if (Drupal.settings.dragNDropUploads.hide == true) {
        $(Drupal.settings.dragNDropUploads.dropzones['default'].wrapper).hide();
      }
      // Attach standard dropzones.
      $.each(Drupal.settings.dragNDropUploads.dropzones, function() { Drupal.dragNDropUploads.attachDropzone(this) });
      // WYSIWYG module support.
      if (Drupal.wysiwyg !== undefined) {
        // Attach WYSIWYG dropzones.
        _wysiwygInit = function() {
          _this = this;
          $.each(Drupal.wysiwyg.instances, function() {
            if (Drupal.settings.dragNDropUploads.dropzones['default'].iframe !== undefined) {
              delete Drupal.settings.dragNDropUploads.dropzones['default'].iframe;
            }
            if (this.editor != 'none') {
              Drupal.dragNDropUploads.wysiwygAttachDropzones(this.field);
              // Send null data for TinyMCE & Safari/Chrome issue.
              if (Drupal.wysiwyg.instances[this.field].editor == 'tinymce') {
                Drupal.wysiwyg.instances[this.field].insert('');
              }
            }
          });
        }
        // Re-attach WYSIWYG on format change.
        $('INPUT[name="format"]').bind('change', function() {
          format = 'format' + $(this).val();
          if (Drupal.wysiwyg !== undefined) {
            $.each(Drupal.settings.wysiwyg.configs, function(editor) {
              if (this[format]) {
                Drupal.wysiwyg.instances['edit-body'].editor = editor;
                _wysiwygInit();
                return false;
              }
              return true;
            });
          }
        })
        // Re-attach WYSIWYG on Enable rich text.
        $('#wysiwyg-toggle-edit-body').bind('blur', _wysiwygInit);
        // Initialize WYSIWYG support.
        _wysiwygInit();
      }
    }
    // Initialize Yahoo! BrowserPlus if available.
    typeof(BrowserPlus) == 'undefined' ? _init() : BrowserPlus.init(function(r) {
      !r.success ? _init() : BrowserPlus.require(
        {services: [{service: 'DragAndDrop'}]}, function(r) { _init(); }
      );
    });
  });

  Drupal.dragNDropUploads = {
    // Standard dropzone attachment function.
    attachDropzone: function(dropzone) {
      $(dropzone.selector || dropzone.wrapper).each(function() {
        $(this).addClass('dropzone dropzone-' + dropzone.id);
        // Safari/Chrome support.
        if ($.browser.safari) {
          $(this).bind("dragover", Drupal.dragNDropUploads.safariUpload);
        }
        // Firefox 3.6 support.
        else if ($.browser.mozilla && $.browser.version >= '1.9.2') {
          $(this).bind("dragover drop", function(e) { e.stopPropagation(); e.preventDefault(); });
          this.addEventListener("drop", Drupal.dragNDropUploads.firefoxUpload, false);
        }
        // Google Gears support.
        else if (window.google && google.gears) {
          $(this).bind("dragover drop", function(e) { e.stopPropagation(); e.preventDefault(); });
          // Firefox support.
          if ($.browser.mozilla || $.browser.safari) {
            this.addEventListener("drop", Drupal.dragNDropUploads.gearsUpload, false);
          }
          // Internet Explorer support.
          else if ($.browser.msie) {
            this.attachEvent("ondrop", Drupal.dragNDropUploads.gearsUpload, false);
          }
        }
        // Yahoo! BrowserPlus support.
        else if (BrowserPlus && BrowserPlus.isInitialized()) {
          var id = $(this).attr('id');
          BrowserPlus.DragAndDrop.AddDropTarget({ id: id }, function(r) {
            BrowserPlus.DragAndDrop.AttachCallbacks({ id: id, drop: Drupal.dragNDropUploads.browserPlusUpload }, function(r) {});
          });
        }
      });
    },

    // WYSIWYG dropzone attachment function.
    wysiwygAttachDropzones: function(field) {
      dropzone = Drupal.settings.dragNDropUploads.dropzones['default'];
      dropzone.selector = null;
      switch (Drupal.wysiwyg.instances[field].editor) {
        // CKeditor support.
        case 'ckeditor':
          if (CKEDITOR.instances[field].container !== undefined) {
            dropzone.iframe = $(CKEDITOR.instances[field].container.$).find('iframe');
            dropzone.selector = CKEDITOR.instances[field].document.$;
          }
          break;
        // FCKeditor support.
        case 'fckeditor':
          if (typeof(FCKeditorAPI) !== 'undefined' && typeof(FCKeditorAPI.Instances[field]) !== 'undefined') {
            dropzone.iframe = $('#' + field + '___Frame');
            dropzone.selector = FCKeditorAPI.Instances[field].EditingArea.Document;
            dropzone.toolbar = $(FCKeditorAPI.Instances[field].ToolbarSet._TargetElement);
          }
          break;
        // jWYSIWYG support.
        // No insert method.
        case 'jwysiwyg':
          dropzone.iframe = $("#" + field + "IFrame");
          dropzone.selector = dropzone.iframe.get(0).contentDocument;
          break;
        // NicEdit support.
        // No insert method.
        case 'nicedit':
          dropzone.selector = nicEditors.findEditor(field).elm;
          break;
        // TinyMCE support.
        case 'tinymce':
          if (tinyMCE.editors[field] !== undefined) {
            dropzone.iframe = $('#' + field + '_ifr');
            dropzone.selector = tinyMCE.editors[field].contentDocument;
          }
          break;
        // Whizzywig support.
        //case 'whizzywig':
        //  dropzone.selector = $('#whizzy' + field).get(0).contentDocument;
        //  break;
        // WYMEditor support.
        case 'wymeditor':
          dropzone.iframe = $('#' + field + '-wrapper .wym_iframe IFRAME');
          dropzone.selector = dropzone.iframe.get(0).contentDocument;
          break;
        // YUI editor support.
        case 'yui':
          if (YAHOO.widget.EditorInfo._instances[field]._getDoc() !== false) {
            dropzone.iframe = $('#edit-body_editor');
            dropzone.selector = YAHOO.widget.EditorInfo._instances[field]._getDoc();
          }
          break;
      }
      // WYSIWYG selector unavailable, loop.
      if (dropzone.selector == null && Drupal.wysiwyg.instances[field].editor !== 'none') {
        setTimeout("Drupal.dragNDropUploads.wysiwygAttachDropzones('" + field + "')", 1000);
      }
      // Attach WYSIWYG dropzone.
      else if (Drupal.wysiwyg.instances[field].editor !== 'none') {
        Drupal.dragNDropUploads.attachDropzone(dropzone);
      }
    },

    // Safari/Chrome Upload function.
    safariUpload: function(e) {
      e.stopPropagation();
      e.preventDefault();
      id = ($(this).attr('class') !== undefined) ? $(this).attr('class').match(/dropzone-([^\s]*)/) : new Array('default', 'default');
      Drupal.settings.dragNDropUploads.dropzone = Drupal.settings.dragNDropUploads.dropzones[id[1]];
      Drupal.settings.dragNDropUploads.target = (Drupal.settings.dragNDropUploads.dropzone.target == true) ? $(this) : null;
      if ($('#dragndrop-uploads').find('input').length < 1) {
        var origFile = $(Drupal.settings.dragNDropUploads.dropzone.wrapper + ' .form-file:first');
        var dropFile = $(origFile).clone().prependTo('#dragndrop-uploads');
        // Upload and cleanup.
        $(dropFile).change(function() {
          $('#dragndrop-uploads').hide();
          $(origFile).replaceWith(dropFile);
          Drupal.settings.dragNDropUploads.trigger = true;
          $(Drupal.settings.dragNDropUploads.dropzone.wrapper + ' .form-submit[value="' + Drupal.settings.dragNDropUploads.dropzone.submit + '"]:first').trigger('mousedown');
          Drupal.dragNDropUploads.uploadProgress(null);
        });
        // Cleanup on no upload.
        $(dropFile).mousemove(function() {
          setTimeout(function() {
            $('#dragndrop-uploads').hide();
            $(dropFile).remove();
          }, '100');
        });
      }
      // Move dropzone underneath cursor.
      if (Drupal.settings.dragNDropUploads.offset == null) {
        $('#dragndrop-uploads').show();
        Drupal.settings.dragNDropUploads.offset = $('#dragndrop-uploads').offset();
      }
      $('#dragndrop-uploads').show().css({
        top: (
          e.pageY - Drupal.settings.dragNDropUploads.offset.top - 50 + (Drupal.settings.dragNDropUploads.dropzone.iframe !== undefined
            ? Drupal.settings.dragNDropUploads.dropzone.iframe.offset().top + (Drupal.settings.dragNDropUploads.dropzone.toolbar !== undefined
              ? Drupal.settings.dragNDropUploads.dropzone.toolbar.height() : 0
            ) : 0
          )) + "px",
        left: (
          e.pageX - Drupal.settings.dragNDropUploads.offset.left - 50 + (Drupal.settings.dragNDropUploads.dropzone.iframe !== undefined
            ? Drupal.settings.dragNDropUploads.dropzone.iframe.offset().left
            : 0
          )) + "px"
      });
    },

    // Firefox 3.6 Upload function.
    firefoxUpload: function(e) {
      id = ($(this).attr('class') !== undefined) ? $(this).attr('class').match(/dropzone-([^\s]*)/) : new Array('default', 'default');
      Drupal.settings.dragNDropUploads.dropzone = Drupal.settings.dragNDropUploads.dropzones[id[1]];
      if ($(Drupal.settings.dragNDropUploads.dropzone.wrapper + ' .form-file').length > 0) {
        Drupal.settings.dragNDropUploads.target = (Drupal.settings.dragNDropUploads.dropzone.target == true) ? $(this) : null;
        Drupal.settings.dragNDropUploads.trigger = true;
        ajaxField = Drupal.settings.ahah[$(Drupal.settings.dragNDropUploads.dropzone.wrapper + ' .form-submit[value="' + Drupal.settings.dragNDropUploads.dropzone.submit + '"]:first').attr('id')];
        if (e.dataTransfer.files !== null) {
          var file = e.dataTransfer.files[0];
          var fileReader = FileReader();
          fileReader.addEventListener("loadend", function(e) {
            // Build RFC2388 string.
            var boundary = '------multipartformboundary' + (new Date).getTime();
            var data = 'Content-Type: multipart/form-data; boundary=' + boundary + '\r\n\r\n';
            data += '--' + boundary;
            $('#node-form :input:not(:submit), ' + ajaxField.selector).each(function() {
              data += '\r\nContent-Disposition: form-data; name="' + $(this).attr('name') + '"';
              if ($(this).attr('name') == $(Drupal.settings.dragNDropUploads.dropzone.wrapper + ' .form-file:first').attr('name')) {
                Drupal.settings.dragNDropUploads.file = file.name;
                data += '; filename="' + file.name + '"\r\n';
                data += 'Content-Type: ' + file.type + '\r\n\r\n';
                data += e.target.result + '\r\n'; // Append binary data.
              }
              else {
                data += '\r\n\r\n' + ($(this).attr('type') == 'checkbox' ? ($(this).attr('checked') == true ? 1 : 0) : $(this).val()) + '\r\n';
              }
              data += '--' + boundary; // Write boundary.
            });
            data += '--'; // Mark end of the request.
            // Send XMLHttpRequest.
            var xhr = new XMLHttpRequest();
            xhr.upload.onprogress = function(e) { Drupal.dragNDropUploads.uploadProgress(e) }
            xhr.onreadystatechange = function() {
              if (xhr.readyState == 4 && xhr.status == 200) {
                response = Drupal.parseJson(xhr.responseText);
                var ahah = new Drupal.ahah(ajaxField.selector.substr(1), ajaxField);
                ahah.success(response, 'success');
              }
            }
            xhr.open('POST', ajaxField.url, true);
            xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=' + boundary);
            xhr.sendAsBinary(data);
          }, false);
          fileReader.readAsBinaryString(file);
        }
      }
    },

    // Google Gears Upload function.
    gearsUpload: function(e) {
      target = $(e.srcElement).parents().find('.dropzone').get(0) || this;
      id = ($(this).attr('class') !== undefined) ? $(this).attr('class').match(/dropzone-([^\s]*)/) : new Array('default', 'default');
      Drupal.settings.dragNDropUploads.dropzone = Drupal.settings.dragNDropUploads.dropzones[id[1]];
      if ($(Drupal.settings.dragNDropUploads.dropzone.wrapper + ' .form-file').length > 0) {
        Drupal.settings.dragNDropUploads.target = (Drupal.settings.dragNDropUploads.dropzone.target == true) ? $(target) : null;
        Drupal.settings.dragNDropUploads.trigger = true;
        ajaxField = Drupal.settings.ahah[$(Drupal.settings.dragNDropUploads.dropzone.wrapper + ' .form-submit[value="' + Drupal.settings.dragNDropUploads.dropzone.submit + '"]:first').attr('id')];
        var desktop = google.gears.factory.create('beta.desktop');
        data = desktop.getDragData(e, 'application/x-gears-files');
        if (data !== null && data.files !== null) {
          var file = data.files[0];
          file.meta = desktop.extractMetaData(file.blob);
          // Build RFC2388 string.
          var boundary = '------multipartformboundary' + (new Date).getTime();
          var data = google.gears.factory.create('beta.blobbuilder');
          data.append('Content-Type: multipart/form-data; boundary=' + boundary + '\r\n\r\n');
          data.append('--' + boundary);
          $('#node-form :input:not(:submit), ' + ajaxField.selector).each(function() {
            data.append('\r\nContent-Disposition: form-data; name="' + $(this).attr('name') + '"');
            if ($(this).attr('name') == $(Drupal.settings.dragNDropUploads.dropzone.wrapper + ' .form-file:first').attr('name')) {
              Drupal.settings.dragNDropUploads.file = file.name;
              data.append('; filename="' + file.name + '"\r\n');
              data.append('Content-Type: ' + file.meta.mimeType + '\r\n\r\n');
              data.append(file.blob); // Append binary data.
              data.append('\r\n');
            }
            else {
              data.append('\r\n\r\n' + ($(this).attr('type') == 'checkbox' ? ($(this).attr('checked') == true ? 1 : 0) : $(this).val()) + '\r\n');
            }
            data.append('--' + boundary); // Write boundary.
          });
          data.append('--'); // Mark end of the request.
          // Send XMLHttpRequest.
          var xhr = google.gears.factory.create('beta.httprequest');
          xhr.upload.onprogress = function(e) { Drupal.dragNDropUploads.uploadProgress(e) }
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              response = Drupal.parseJson(xhr.responseText);
              var ahah = new Drupal.ahah(ajaxField.selector.substr(1), ajaxField);
              ahah.success(response, 'success');
            }
          }
          xhr.open('POST', ajaxField.url);
          xhr.setRequestHeader('content-type', 'multipart/form-data; boundary=' + boundary);
          xhr.send(data.getAsBlob());
        }
      }
    },

    // Yahoo! BrowserPlus Upload function.
    browserPlusUpload: function(e) {
      // TODO
    },

    // Upload progress.
    uploadProgress: function(e) {
      if (Drupal.settings.dragNDropUploads.target !== null) {
        message = 'Uploading ' + (Drupal.settings.dragNDropUploads.file ? '<em>' + Drupal.settings.dragNDropUploads.file + '</em>' : 'file')
        if (!Drupal.settings.dragNDropUploads.progress) {
          // Initialize progress bar.
          Drupal.settings.dragNDropUploads.progress = new Drupal.progressBar('updateprogress', function (progress, status, pb) {}, "POST", function (pb) {});
          Drupal.settings.dragNDropUploads.progress.setProgress(-1, message);
          // Position progress bar in the center of dropzone target.
          target = (Drupal.settings.dragNDropUploads.target.get(0).body == undefined) ? $(Drupal.settings.dragNDropUploads.target) : Drupal.settings.dragNDropUploads.dropzone.iframe;
          $(target).after(Drupal.settings.dragNDropUploads.progress.element);
          $(Drupal.settings.dragNDropUploads.progress.element)
            .css('width', target.width() / 2 + 'px')
            .css({
              'top': target.offset().top + ((Drupal.settings.dragNDropUploads.target.get(0).body !== undefined && Drupal.settings.dragNDropUploads.dropzone.toolbar !== undefined)
                ? Drupal.settings.dragNDropUploads.dropzone.toolbar.height() : 0) - $(Drupal.settings.dragNDropUploads.progress.element).offset().top + (target.height() / 2) - ($(Drupal.settings.dragNDropUploads.progress.element).height() / 2) + 'px',
              'left': target.offset().left - $(Drupal.settings.dragNDropUploads.progress.element).offset().left + (target.width() / 2) - ($(Drupal.settings.dragNDropUploads.progress.element).width() / 2) + 'px'
            });
        }
        // Update progress bar.
        if (e !== null) {
          percentage = Math.round((e.loaded / e.total) * 100);
          Drupal.settings.dragNDropUploads.progress.setProgress(percentage, message);
        }
      }
    }
  }

  // Post upload behaviour.
  Drupal.behaviors.dragNDropUploads = function(context) {
    if (Drupal.settings.dragNDropUploads.trigger) {
      // Remove progress bar.
      if (Drupal.settings.dragNDropUploads.progress) {
        $(Drupal.settings.dragNDropUploads.progress.element).remove();
        Drupal.settings.dragNDropUploads.progress = null;
      }
      // Return HTML reference to new upload.
      var output = $(context).find(Drupal.settings.dragNDropUploads.dropzone.result).val() || $(context).find(Drupal.settings.dragNDropUploads.dropzone.result).html();
      if (output !== '' && output !== null && Drupal.settings.dragNDropUploads.target !== null) {
        if ($(Drupal.settings.dragNDropUploads.target).get(0).tagName == 'TEXTAREA') {
          $(Drupal.settings.dragNDropUploads.target).val($(Drupal.settings.dragNDropUploads.target).val() + output);
        }
        // WYSIWYG API support.
        else if ($.isFunction(Drupal.wysiwyg.instances[Drupal.wysiwyg.activeId].insert)) {
          // Send null data for FCKeditor/CKeditor & Safari/Chrome issue.
          if ($.browser.safari && (Drupal.wysiwyg.instances[Drupal.wysiwyg.activeId].editor == 'fckeditor' || Drupal.wysiwyg.instances[Drupal.wysiwyg.activeId].editor == 'ckeditor')) {
            Drupal.wysiwyg.instances[Drupal.wysiwyg.activeId].insert('');
          }
          Drupal.wysiwyg.instances[Drupal.wysiwyg.activeId].insert(output);
          // Cleanup references to local file.
          if ($.browser.mozilla) {
            $(Drupal.settings.dragNDropUploads.dropzone.selector.body).html(
              $(Drupal.settings.dragNDropUploads.dropzone.selector.body).html()
                .replace(/<img[^>]+file:\/\/\/.*?>/g, '')
                .replace(/<a[^>]+file:\/\/\/.*?<\/a>/g, '')
            );
          }
        }
      }
      // Add another item.
      if ($(Drupal.settings.dragNDropUploads.dropzone.wrapper + ' .form-file:first').length == 0) {
        if ($(Drupal.settings.dragNDropUploads.dropzone.wrapper + ' .form-submit:last').val() == 'Add another item') {
          $(Drupal.settings.dragNDropUploads.dropzone.wrapper + ' .form-submit:last').trigger('mousedown');
        }
      }
      // Reset variables.
      Drupal.settings.dragNDropUploads.target = null;
      Drupal.settings.dragNDropUploads.trigger = false;
    }
  };
})(jQuery);
