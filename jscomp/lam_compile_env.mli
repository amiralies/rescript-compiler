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



(** Helper for global Ocaml module index into meaningful names  *) 

type primitive_description = Types.type_expr option Primitive.description

type key = 
  | GetGlobal of Ident.t * int * Env.t 
  | QueryGlobal of Ident.t * Env.t * bool 
  (** the boolean is expand or not
      when it's passed as module, it should be expanded, 
      otherwise for alias, [include Array], it's okay to return an identifier
      TODO: be more clear about its concept
  *)
  (** we need register which global variable is an dependency *)
  | CamlRuntimePrimitive of primitive_description * J.expression list  

type ident_info = {
  id : Ident.t;
  name : string;
  signatures : Types.signature;
  arity : Lam_stats.function_arities; 
  closed_lambda : Lambda.lambda option 
}

type module_info = {
  signature :  Types.signature ;
  pure : bool 
}

val find_and_add_if_not_exist : 
  Ident.t * int -> 
  Env.t -> 
  not_found:(Ident.t -> 'a) -> 
  found:(ident_info -> 'a) -> 'a

val query_and_add_if_not_exist : 
  Lam_module_ident.t -> 
  Env.t -> 
  not_found:(unit -> 'a) -> 
  found:( module_info -> 'a) -> 'a

val add_js_module : ?id:Ident.t -> string  -> Ident.t 
(** add third party dependency *)

(* The other dependencies are captured by querying 
   either when [access] or when expansion, 
   however such dependency can be removed after inlining etc.

   When we register such compile time dependency we classified 
   it as 
   Visit (ml), Builtin(built in js), External()

   For external, we never remove, we only consider 
   remove dependency for Runtime and Visit, so 
   when compile OCaml to Javascript, we only need 
   pay attention to for those modules are actually used or not
*)

val reset : unit -> unit 

val is_pure : Lam_module_ident.t -> Env.t -> bool

(* The second argument is mostly from [runtime] modules 
    will change the input [hard_dependencies]
*)
val get_requried_modules : 
  Env.t ->
  Lam_module_ident.t list ->
  Lam_module_ident.t Hash_set.hashset -> 
  Lam_module_ident.t list
