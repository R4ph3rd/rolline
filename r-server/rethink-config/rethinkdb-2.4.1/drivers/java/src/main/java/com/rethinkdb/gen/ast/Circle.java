// Autogenerated by metajava.py.
// Do not edit this file directly.
// The template for this file is located at:
// ../../../../../../../../templates/AstSubclass.java

package com.rethinkdb.gen.ast;

import com.rethinkdb.gen.proto.TermType;
import com.rethinkdb.gen.exc.ReqlDriverError;
import com.rethinkdb.model.Arguments;
import com.rethinkdb.model.OptArgs;
import com.rethinkdb.ast.ReqlAst;



public class Circle extends ReqlExpr {


    public Circle(Object arg) {
        this(new Arguments(arg), null);
    }
    public Circle(Arguments args){
        this(args, null);
    }
    public Circle(Arguments args, OptArgs optargs) {
        super(TermType.CIRCLE, args, optargs);
    }
    public Circle optArg(String optname, Object value) {
        OptArgs newOptargs = OptArgs.fromMap(optargs).with(optname, value);
        return new Circle(args, newOptargs);
    }
    public Circle optArg(String optname, ReqlFunction0 value) {
        OptArgs newOptargs = OptArgs.fromMap(optargs).with(optname, value);
        return new Circle(args, newOptargs);
    }
    public Circle optArg(String optname, ReqlFunction1 value) {
        OptArgs newOptargs = OptArgs.fromMap(optargs).with(optname, value);
        return new Circle(args, newOptargs);
    }
    public Circle optArg(String optname, ReqlFunction2 value) {
        OptArgs newOptargs = OptArgs.fromMap(optargs).with(optname, value);
        return new Circle(args, newOptargs);
    }
    public Circle optArg(String optname, ReqlFunction3 value) {
        OptArgs newOptargs = OptArgs.fromMap(optargs).with(optname, value);
        return new Circle(args, newOptargs);
    }
    public Circle optArg(String optname, ReqlFunction4 value) {
        OptArgs newOptargs = OptArgs.fromMap(optargs).with(optname, value);
        return new Circle(args, newOptargs);
    }

}
