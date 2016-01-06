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



val add : string -> string -> string


val bytes_cat : bytes -> bytes -> bytes
val bytes_of_string : string -> bytes
val bytes_to_string : bytes -> string

val caml_is_printable : char -> bool
val caml_string_of_char_array : char array -> string
val caml_string_get : string -> int -> char 
val caml_string_compare : string -> string -> int
val caml_create_string : int -> bytes
val caml_fill_string : bytes -> int -> int -> char -> unit
val caml_blit_string : string -> int -> bytes -> int -> int -> unit
val caml_blit_bytes : bytes -> int -> bytes -> int -> int -> unit
