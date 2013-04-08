(function($) {

  var defaults =
  { placeholder: $('<div/>', { class: 'sortable-placeholder' })
  , selector: 'li'
  }

  function Sortable(el, options) {
    this.el = el
    this.options = $.extend({}, defaults, options)
    this.init()
  }

  Sortable.prototype.init = function() {
    var self = this
      , els = $(this.el).find(this.options.selector)
      , dragging
      , placeholder

    els.on('dragstart', function() {
      dragging = $(this)
      placeholder = self.options.placeholder.clone()

      // Must be canceled in order for drop event to fire
      placeholder.on('dragenter dragover', function(ev) {
        ev.preventDefault()
        return false
      })

      dragging.one('dragend', function(ev) {
        ev.preventDefault()
        placeholder.replaceWith(dragging.show())
      })
    })

    els.on('dragenter dragover', function(ev) {
      var el = $(this)

      ev.preventDefault()
      dragging.hide()

      if (el.index() < placeholder.index()) {
        el.before(placeholder)
      } else {
        el.after(placeholder)
      }

      return false
    })
  }

  $.fn.sortable = function(options) {
    return this.each(function() {
      if ($.data(this, 'plugin_sortable')) { return }
      $.data(this, 'plugin_sortable', new Sortable(this, options))
    })
  }

}(jQuery))
