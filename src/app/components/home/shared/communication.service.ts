import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { log } from 'util';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

/**
 * Service to mainly enable components to comunicate.
 */
@Injectable()
export class CommunicationService{
    
    public instruction_sub_comb = new Subject<any>();
    public course_sub_comb = new Subject<any>();
    public search_sub_comb = new Subject<any>();
    private color: string;
    private category: string;

    constructor() {}
    
    /**
     * 
     * @param message containing info about opening and closing menu.
     * Publised message to instruction_sub_comb subject.
     */
    sendMessage(message: boolean) {        
        this.instruction_sub_comb.next(message);
    }

    /**
     * 
     * @param message containing info about if current view is course view.
     * Publised message to course_sub_comb subject.
     */
    sendCourseViewMessage(message: boolean) {        
        this.course_sub_comb.next(message);
    }

    /**
     * 
     * @param message containing info about if current view is search view.
     * Publised message to search_sub_comb subject.
     */
    searchViewMessage(message: boolean) {        
        this.search_sub_comb.next(message);
    }

    /**
     * 
     * @param color Background color class of courses overview.
     * @param category Current Category.
     * Sets info of current category by selecting the category in the category view.
     */
    setInfo(color: string, category: string) {
        this.color = color;
        this.category = category;
    }

    /**
     * Providing info of current category to the courses view.
     */
    getInfo(): Observable<any>{
        return of(
            {
                'color': this.color,
                'category': this.category
            });
    }

}     