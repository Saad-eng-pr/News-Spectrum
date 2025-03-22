import { Injectable } from '@angular/core';

class BooleanRef {
    private _value: boolean; // Private property
    private _reversals: BooleanRef[];

    constructor(initialValue: boolean, ...reversals: BooleanRef[]) {
      this._value = initialValue;
      this._reversals = reversals;
    }
  
    get value(): boolean {
      console.log(`Getting value... ${this._value}`);
      return this._value;
    }
  
    set value(newValue: boolean) {
      console.log(`Setting value to: ${newValue}`);
      this._value = newValue;
    }
    switch(lock: boolean = true){
        this._value = !this._value;
        if(!lock){
            for(let ref of this._reversals){
                ref.switch(true);
            }
        }
    }
  }


@Injectable({
    providedIn: 'root',
})

export class StaticEnvService {
    static activeEnv = new Map<string, BooleanRef>([
        ['ActiveSideBar', new BooleanRef(false)],
    ]);
    // constructor(){
    //     this.activeEnv.set('ActiveSideBar', new BooleanRef(false));
    // }
    switch(objStr: string){
        let obj = StaticEnvService.activeEnv.get(objStr);
        if(obj){
            obj.switch();
            console.log(`${obj.value}`);
            return true;
        }
        return false;
    } 

    check(objStr: string){
        let obj = StaticEnvService.activeEnv.get(objStr);
        if(obj){
            return obj.value;
        }
        return false;
    }
}