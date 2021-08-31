const addComment = {
  /**
   * Moves form.
   * @param {*} commId - the id attribute of the comment replied to (e.g., "comment-10").
   * @param {*} respondId - the string 'respond'.
   * @param {*} postId - the page slug.
   * @param {*} parentUid - uid.
   */
  moveForm: function( commId, respondId, postId, parentUid ) {
    var div, element, style, cssHidden, t = this,               //t is the addComment object, with functions moveForm and I, and variable respondId
    comm        = t.I( commId ),                                // whole comment
    respond     = t.I( respondId ),                             // whole new comment form
    cancel      = t.I( 'cancel-comment-reply-link' ),           // whole reply cancel link
    parentuidF  = t.I( 'comment-replying-to-uid' ),             // a hidden element in the comment
    post        = t.I( 'comment-post-slug' ),                   // null
    commentForm = respond.getElementsByTagName( 'form' )[0];    // the <form> part of the comment_form div

    if ( ! comm || ! respond || ! cancel || ! parentuidF || ! commentForm ) {
      return;
    }

    t.respondId = respondId;
    postId = postId || false;

    if ( ! t.I( 'sm-temp-form-div' ) ) {
      div = document.createElement( 'div' );
      div.id = 'sm-temp-form-div';
      div.style.display = 'none';
      respond.parentNode.insertBefore( div, respond ); //create and insert a bookmark div right before comment form
    }

    comm.parentNode.insertBefore( respond, comm.nextSibling );  //move the form from the bottom to above the next sibling
    if ( post && postId ) {
      post.value = postId;
    }
    parentuidF.value = parentUid;
    cancel.style.display = '';                        //make the cancel link visible

    cancel.onclick = function() {
      var t       = addComment,
      temp    = t.I( 'sm-temp-form-div' ),            //temp is the original bookmark
      respond = t.I( t.respondId );                   //respond is the comment form

      if ( ! temp || ! respond ) {
        return;
      }

      t.I( 'comment-replying-to-uid' ).value = null;
      temp.parentNode.insertBefore( respond, temp );  //move the comment form to its original location
      temp.parentNode.removeChild( temp );            //remove the bookmark div
      this.style.display = 'none';                    //make the cancel link invisible
      this.onclick = null;                            //retire the onclick handler
      return false;
    };

    try {
      for ( var i = 0; i < commentForm.elements.length; i++ ) {
        element = commentForm.elements[i];
        cssHidden = false;
        style = window.getComputedStyle( element );

        if ( ( element.offsetWidth <= 0 && element.offsetHeight <= 0 ) || style.visibility === 'hidden' ) {
          cssHidden = true;
        }

        // Skip form elements that are hidden or disabled.
        if ( 'hidden' === element.type || element.disabled || cssHidden ) {
          continue;
        }

        element.focus();
        // Stop after the first focusable element.
        break;
      }

    } catch( er ) {}

    return false;
  },

  I: function( id ) {
    return document.getElementById( id );
  }
};