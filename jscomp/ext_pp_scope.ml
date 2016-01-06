(* OCamlScript compiler
 * Copyright (C) 2015-2016 Bloomberg Finance L.P.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, with linking exception;
 * either version 2.1 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA 02111-1307, USA.
 *)

(* Author: Hongbo Zhang  *)



type t =  
    int  Int_map.t String_map.t

let empty = 
  String_map.empty 

let add_ident (id : Ident.t) (cxt : t) : int * t = 
  match String_map.find id.name cxt with 
  | exception Not_found -> (0, String_map.add id.name Int_map.(add id.stamp 0  empty) cxt )
  | imap -> (
    match Int_map.find id.stamp imap with
    | exception Not_found ->
      let v = Int_map.cardinal imap in
      v, String_map.add id.name (Int_map.add id.stamp v imap) cxt
    | i -> i, cxt
  )

let of_list lst cxt = 
  List.fold_left (fun scope i -> snd (add_ident i scope)) cxt lst 

let merge set cxt  = 
  Ident_set.fold (fun ident acc -> snd (add_ident ident acc)) set  cxt 

(* Assume that all idents are already in the scope
   so both [param/0] and [param/1] are in idents, we don't need 
   update twice,  once is enough
 *)
let sub_scope (scope : t) ident_collection : t =
  let cxt = empty in
  Ident_set.fold (fun (i : Ident.t) acc -> 
    match String_map.find i.name scope with 
    | exception Not_found -> assert false 
    | imap -> ( 
      (* They are the same if already there*)
      match String_map.find i.name acc with 
      | exception Not_found -> String_map.add i.name imap acc
      | _ -> acc  (* TODO: optimization *) 
    )
  ) ident_collection cxt 

(* purely functional environment *)

module P = Ext_format

let string_of_id (id : Ident.t) ( cxt : t ) : int * t = 

  match String_map.find id.name cxt with
  | exception Not_found -> 
    (
      0,
      String_map.add id.name Int_map.(add id.stamp 0  empty) cxt 
    )
  | imap -> (* stamp -> print id *)
    begin 
      match Int_map.find id.stamp imap with
      | exception Not_found ->
        let v = Int_map.cardinal imap in
        (
          v,
          String_map.add id.name (Int_map.(add id.stamp v imap) : int Int_map.t) cxt
        )
      | i -> (i, cxt)
    end
