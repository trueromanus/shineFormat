/*
	shineFormat
	
	Some functions for string formatting.
	
	Copyright (c) 2015 RomanAsylum
*/

function shineFormat() { }

shineFormat.startBracketParameter = '{';
shineFormat.endBracketParameter = '}';

shineFormat.concat = 1;
shineFormat.replace = 2;
shineFormat.replaceSymbolTable = 3;
shineFormat.replaceStringTable = 4;
shineFormat.wrap = 5;

shineFormat.escapeRegExpCharacters = function escapeRegExpCharacters( str ) {
	return str.replace( /[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&" );
}
shineFormat.getRegExpSearchGlobalExpression = function getRegExpSearchGlobalExpression( str ) {
	return new RegExp( shineFormat.escapeRegExpCharacters( str ), "g" );
}
shineFormat.getKeyInBracket = function getKeyInBracket( key ) {
	if ( key === undefined || key == null ) throw 'Argument key is undefined.';

	return shineFormat.startBracketParameter + key + shineFormat.endBracketParameter;
}
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
shineFormat.pipeline = function pipeline() {
	if ( arguments.length == 0 ) throw 'Arguments is empty.';

	var result = arguments[0];

	for ( var i = 1; i < arguments.length ; i++ ) {
		var command = arguments[i];

		if ( command instanceof Array ) {
			if ( command.length == 0 ) throw new 'Array in position ' + i + ' is empty.';

			switch ( command[0] ) {
				case shineFormat.concat:
					var resultString = command[1];
					if ( command.length > 2 ) {
						for ( var l = 2; l < command.length; l++ ) {
							var item = command[l];
							if ( item instanceof Array ) {
								resultString = shineFormat.formatNumeric( resultString, item );
							} else {
								resultString = shineFormat.formatKeys( resultString, item );
							}
						}
					}
					result += resultString;
					break;
				case shineFormat.replace:
					if ( command.length < 3 ) throw 'Incorrect data set in position ' + i + '.';

					var oldCharacters = command[1];
					var newCharacters = command[2];
					result = shineFormat.formatReplace( result, oldCharacters, newCharacters );
					break;
				case shineFormat.replaceSymbolTable:
					if ( command.length < 3 ) throw 'Incorrect data set in position ' + i + '.';

					var oldCharaterTable = command[1];
					var newCharaterTable = command[2];
					if ( oldCharaterTable.length != newCharaterTable.length ) throw 'Replace character table do not match length in position ' + i + '.';

					for ( var l = 0; l < oldCharaterTable.length; l++ ) {
						result = shineFormat.formatReplace( result, oldCharaterTable[l], newCharaterTable[l] );
					}
					break;
				case shineFormat.replaceStringTable:
					if ( command.length < 3 ) throw 'Incorrect data set in position ' + i + '.';

					var oldStringTable = command[1];
					var newStringTable = command[2];
					if ( !( oldStringTable instanceof Array ) ) throw 'Incorrect type. Expected type is Array in position ' + i + '.';
					if ( !( newStringTable instanceof Array ) ) throw 'Incorrect type. Expected type is Array in position ' + i + '.';
					if ( oldStringTable.length != newStringTable.length ) throw 'Replace character table do not match length in position ' + i + '.';

					for ( var l = 0; l < oldStringTable.length; l++ ) {
						result = shineFormat.formatReplace( result, oldStringTable[l], newStringTable[l] );
					}
					break;
				case shineFormat.wrap:
					var wrappedString = command[1];
					var options = command[2];
					result = shineFormat.formatWrap( result, wrappedString, options );
					break;
				default: throw 'Incorrect command type in position ' + i + '.';
			}
		}
	}

	return result;
}
String.prototype.pipeline = function pipeline() {
	var argumentsArray = Array.prototype.slice.call( arguments );
	return shineFormat.pipeline.apply( null, [this].concat( argumentsArray ) );
}