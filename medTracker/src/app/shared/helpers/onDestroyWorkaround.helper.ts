import { NavigationEnd, Router } from "@angular/router";
import { Subscription } from "rxjs";

export const onDestroyWorkaround = (router: Router, subscription: Subscription)=> {
    setTimeout(()=>{
        router.events.subscribe(
          event => {
          
    
            if(event instanceof NavigationEnd){
      
              subscription.unsubscribe();
              
            }
            
          });
      })
};