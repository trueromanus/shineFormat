/*
	shineFormat
	
	version 1.0.1
	
	Some functions for string formatting.
		
	Copyright (c) 2015 RomanAsylum
*/

function shineFormat() { }
shineFormat.operations = function () { } // namespace for string operations

shineFormat.startBracketParameter = '{';
shineFormat.endBracketParameter = '}';

//Routine functions

shineFormat.escapeRegExpCharacters = function escapeRegExpCharacters( str ) {
	return str.replace( /[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&" );
}
shineFormat.argumentsToArray = function argumentsToArray( args ) {
	return Array.prototype.slice.call( args );
}
shineFormat.getRegExpSearchGlobalExpression = function getRegExpSearchGlobalExpression( str ) {
	return new RegExp( shineFormat.escapeRegExpCharacters( str ), "g" );
}
shineFormat.getKeyInBracket = function getKeyInBracket( key ) {
	if ( key === undefined || key == null ) throw 'Argument key is undefined.';

	return shineFormat.startBracketParameter + key + shineFormat.endBracketParameter;
}

//Format functions

shineFormat.formatNumeric = function formatNumeric( str, arr ) {
	if ( str === undefined || str == null ) throw 'Argument str is undefined.';
	if ( arr === undefined || arr == null ) throw 'Argument arr is undefined.';
	if ( !( arr instanceof Array ) ) throw 'Argument arr not array.';

	var result = str;
	arr.forEach(
		function ( value, index ) {
			result = result.replace(
				shineFormat.getRegExpSearchGlobalExpression( shineFormat.getKeyInBracket( index ) ),
				value
			);
		}
	);
	return result;
}
shineFormat.formatKeys = function formatKeys( str, obj ) {
	if ( str === undefined || str == null ) throw 'Argument str is undefined.';
	if ( obj === undefined || obj == null ) throw 'Argument obj is undefined.';

	var result = str;
	for ( var key in obj ) {
		result = result.replace(
			shineFormat.getRegExpSearchGlobalExpression( shineFormat.getKeyInBracket( key ) ),
			obj[key]
		);
	}

	return result;
}
shineFormat.formatWrap = function formatWrap( str, wrappedString, options ) {
	if ( str === undefined || str == null ) throw 'Argument str is undefined.';
	if ( wrappedString === undefined || wrappedString == null ) throw 'Argument wrappedString is undefined.';
	if ( options === undefined || options == null ) throw 'Argument options is undefined.';
	if ( options.before === undefined || options.before == null ) options.before = "";
	if ( options.after === undefined || options.after == null ) options.after = "";

	return str.replace( shineFormat.getRegExpSearchGlobalExpression( wrappedString ), options.before + wrappedString + options.after );
}
shineFormat.formatReplace = function formatReplace( str, oldCharacters, newCharacters ) {
	if ( str === undefined || str == null ) throw 'Argument str is undefined.';
	if ( oldCharacters === undefined || oldCharacters == null ) throw 'Argument oldCharacters is undefined.';
	if ( newCharacters === undefined || newCharacters == null ) throw 'Argument newCharacters is undefined.';

	return str.replace( shineFormat.getRegExpSearchGlobalExpression( oldCharacters ), newCharacters );
}

//Operations

shineFormat.operations.rightConcat = function operations_concat( result, concatString ) {
	if ( result == undefined || result == null ) throw 'result is undefined.';
	if ( concatString == undefined || concatString == null ) throw 'concatString is undefined.';

	for ( var l = 2; l < arguments.length; l++ ) {
		var item = arguments[l];
		if ( item instanceof Array ) {
			concatString = shineFormat.formatNumeric( concatString, item );
		} else {
			concatString = shineFormat.formatKeys( concatString, item );
		}
	}

	return result + concatString;
}
shineFormat.operations.replace = function operations_replace( result, oldCharacters, newCharacters ) {
	if ( result == undefined || result == null ) throw 'result is undefined.';
	if ( oldCharacters == undefined || oldCharacters == null ) throw 'oldCharacters is undefined.';
	if ( newCharacters == undefined || newCharacters == null ) throw 'newCharacters is undefined.';

	return shineFormat.formatReplace( result, oldCharacters, newCharacters );
}
shineFormat.operations.replaceSymbolTable = function operations_replaceSymbolTable( result, oldCharaterTable, newCharaterTable ) {
	if ( result == undefined || result == null ) throw 'result is undefined.';
	if ( oldCharaterTable == undefined || oldCharaterTable == null ) throw 'oldCharaterTable is undefined.';
	if ( newCharaterTable == undefined || newCharaterTable == null ) throw 'newCharaterTable is undefined.';
	if ( oldCharaterTable.length != newCharaterTable.length ) throw 'Replace character table do not match length in position ' + i + '.';

	for ( var i = 0; i < oldCharaterTable.length; i++ ) {
		result = shineFormat.formatReplace( result, oldCharaterTable[i], newCharaterTable[i] );
	}
	return result;
}
shineFormat.operations.replaceStringTable = function operations_replaceStringTable( result, oldStringTable, newStringTable ) {
	if ( result == undefined || result == null ) throw 'result is undefined.';
	if ( !( oldStringTable instanceof Array ) ) throw 'Incorrect type. Expected type is Array in position ' + i + '.';
	if ( !( newStringTable instanceof Array ) ) throw 'Incorrect type. Expected type is Array in position ' + i + '.';
	if ( oldStringTable.length != newStringTable.length ) throw 'Replace character table do not match length in position ' + i + '.';

	for ( var l = 0; l < oldStringTable.length; l++ ) {
		result = shineFormat.formatReplace( result, oldStringTable[l], newStringTable[l] );
	}
	return result;
}
shineFormat.operations.wrap = function operations_wrap( result, wrappedString, options ) {
	if ( result == undefined || result == null ) throw 'result is undefined.';
	if ( wrappedString == undefined || wrappedString == null ) throw 'wrappedString is undefined.';
	if ( options == undefined || options == null ) throw 'options is undefined.';

	return shineFormat.formatWrap( result, wrappedString, options );
}

//Combined functions

shineFormat.pipeline = function pipeline() {
	if ( arguments.length == 0 ) throw 'Arguments is empty.';

	var result = arguments[0];

	for ( var i = 1; i < arguments.length ; i++ ) {
		var operationData = arguments[i];

		if ( operationData instanceof Array ) {
			if ( operationData.length == 0 ) throw new 'Array in position ' + i + ' is empty.';

			var operationName = operationData[0];
			if ( operationName in shineFormat.operations ) {
				var args = operationData.slice( 1 );
				args.splice( 0, 0, result );
				result = shineFormat.operations[operationName].apply( null, args );
			} else {
				throw 'Incorrect operation in position ' + i + '.';
			}
		}
	}

	return result;
}

//String prototype extensions

String.prototype.pipeline = function pipeline() {
	return shineFormat.pipeline.apply( null, [this].concat( shineFormat.argumentsToArray( arguments ) ) );
}
String.prototype.nformat = function nformat() {
	return shineFormat.formatNumeric.apply( null, [this].concat( shineFormat.argumentsToArray( arguments ) ) );
}
String.prototype.kformat = function kformat() {
	return shineFormat.formatKeys.apply( null, [this].concat( shineFormat.argumentsToArray( arguments ) ) );
}
String.prototype.wrap = function wrap() {
	return shineFormat.formatWrap.apply( null, [this].concat( shineFormat.argumentsToArray( arguments ) ) );
}
String.prototype.replaceAll = function replaceAll() {
	return shineFormat.formatReplace.apply( null, [this].concat( shineFormat.argumentsToArray( arguments ) ) );
}