export var make: (n : any, c : any) => any ;
export var init: (n : any, f : any) => any ;
export var copy: (s : any) => any ;
export var sub: (s : any, ofs : any, len : any) => any ;
export var fill: (s : any, ofs : any, len : any, c : any) => any ;
export var blit:
  (s1 : any, ofs1 : any, s2 : any, ofs2 : any, len : any) => any ;
export var concat: (sep : any, l : any) => any ;
export var iter: (f : any, s : any) => any ;
export var iteri: (f : any, s : any) => any ;
export var map: (f : any, s : any) => any ;
export var mapi: (f : any, s : any) => any ;
export var trim: (s : any) => any ;
export var escaped: (s : any) => any ;
export var index: (s : any, c : any) => any ;
export var rindex: (s : any, c : any) => any ;
export var index_from: (s : any, i : any, c : any) => any ;
export var rindex_from: (s : any, i : any, c : any) => any ;
export var contains: (s : any, c : any) => any ;
export var contains_from: (s : any, i : any, c : any) => any ;
export var rcontains_from: (s : any, i : any, c : any) => any ;
export var uppercase: (s : any) => any ;
export var lowercase: (s : any) => any ;
export var capitalize: (s : any) => any ;
export var uncapitalize: (s : any) => any ;
export var compare: (x : any, y : any) => any ;

