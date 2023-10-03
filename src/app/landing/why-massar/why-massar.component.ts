import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-why-massar',
  templateUrl: './why-massar.component.html',
  styleUrls: ['../landing.component.css', './why-massar.component.css']
})
export class WhyMassarComponent implements AfterViewInit {

  @ViewChild('commentsList') commentsList!: ElementRef;

  ngAfterViewInit() {
    this.centerHighlightedComment();
    this.setupInfiniteScroll();
  }

  centerHighlightedComment() {
    const commentsListElement = this.commentsList.nativeElement;
    const highlightedComment = commentsListElement.querySelector('.comment-highlighted');
    if (highlightedComment) {
      const highlightedCommentOffset = highlightedComment.offsetLeft;
      const containerWidth = commentsListElement.offsetWidth;
      const scrollLeft = highlightedCommentOffset - (containerWidth / 2) + (highlightedComment.offsetWidth / 2);
      commentsListElement.scrollLeft = scrollLeft;
    }
  }

  setupInfiniteScroll() {
    const commentsListElement = this.commentsList.nativeElement;
    commentsListElement.addEventListener('scroll', () => {
      const maxScrollLeft = commentsListElement.scrollWidth - commentsListElement.clientWidth;

      if (commentsListElement.scrollLeft >= maxScrollLeft) {
        // Reached the end, scroll back to the beginning
        commentsListElement.scrollLeft = 0;
      }
    });
  }
}

