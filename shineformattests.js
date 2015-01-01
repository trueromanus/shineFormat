function assertIsTrue( value ) {
	if ( !value ) throw 'Assert exception.';
}
function assertAreEqual( value1, value2 ) {
	if ( value1 !== value2 ) throw 'Values not equal.';
}
function assertThrow( func, args ) {
	var isCatched = false;
	try {
		func.apply( this, args );
	} catch ( x ) {
		isCatched = true;
	}
	if ( !isCatched ) throw 'No throw exception.';
}
function runTests( arr ) {
	var result = "";

	for ( var i in arr ) {
		var test = arr[i];
		try {
			test.func();
		} catch ( x ) {
			result += "[" + test.name + "] Failed: " + x.message + "\n";
			continue;
		}
		result += "[" + test.name + "] Complete!\n";
	}

	return result;
}
function getAllTestMethods() {
	var self = this;
	var result = [];
	for ( var name in self ) {
		var func = self[name];
		if ( func instanceof Function && name.indexOf( "test_" ) == 0 ) {
			result.push( { name: name, func: func } );
		}
	}
	return result;
}


function test_getKeyInBracket_checkResult() {
	var result = shineFormat.getKeyInBracket( "test" );

	assertAreEqual( result, "{test}" );
}
function test_getKeyInBracket_throw_key_undefined() {
	assertThrow(
		shineFormat.getKeyInBracket,
		[undefined]
	);
}
function test_getKeyInBracket_throw_key_null() {
	assertThrow(
		shineFormat.getKeyInBracket,
		[null]
	);
}
function test_formatNumeric_checkResult_single() {
	var result = shineFormat.formatNumeric( "abc{0}ef{1}", ["d", "g"] );
	assertAreEqual( result, "abcdefg" );
}
function test_formatNumeric_checkResult_multiple() {
	var result = shineFormat.formatNumeric( "abc{0}ef{0}hjklm{1}op{1}", ["d", "g"] );
	assertAreEqual( result, "abcdefdhjklmgopg" );
}
function test_formatNumeric_throw_str_undefined() {
	assertThrow(
		shineFormat.formatNumeric,
		[undefined, []]
	);
}
function test_formatNumeric_throw_str_null() {
	assertThrow(
		shineFormat.formatNumeric,
		[null, []]
	);
}
function test_formatNumeric_throw_arr_undefined() {
	assertThrow(
		shineFormat.formatNumeric,
		["", undefined]
	);
}
function test_formatNumeric_throw_arr_null() {
	assertThrow(
		shineFormat.formatNumeric,
		["", null]
	);
}
function test_formatNumeric_throw_arr_notArray() {
	assertThrow(
		shineFormat.formatNumeric,
		["", ""]
	);
}
function test_formatKeys_checkResult_single() {
	var result = shineFormat.formatKeys( "{begin}abcd{end}", { begin: "(", end: ")" } );
	assertAreEqual( result, "(abcd)" );
}
function test_formatKeys_checkResult_multiple() {
	var result = shineFormat.formatKeys( "{end}abcd{end}", { end: ")" } );
	assertAreEqual( result, ")abcd)" );
}
function test_formatKeys_throw_str_undefined() {
	assertThrow(
		shineFormat.formatKeys,
		[undefined, {}]
	);
}
function test_formatKeys_throw_str_null() {
	assertThrow(
		shineFormat.formatKeys,
		[null, {}]
	);
}
function test_formatKeys_throw_obj_undefined() {
	assertThrow(
		shineFormat.formatKeys,
		["", undefined]
	);
}
function test_formatKeys_throw_obj_null() {
	assertThrow(
		shineFormat.formatKeys,
		["", null]
	);
}
function test_formatWrap_checkResult_singleAllOptions() {
	var result = shineFormat.formatWrap( "abcdef", "bc", { before: "(", after: ")" } );
	assertAreEqual( result, "a(bc)def" );
}
function test_formatWrap_checkResult_singleAfterOptions() {
	var result = shineFormat.formatWrap( "abcdef", "bc", { after: ")" } );
	assertAreEqual( result, "abc)def" );
}
function test_formatWrap_checkResult_singleBeforeOptions() {
	var result = shineFormat.formatWrap( "abcdef", "bc", { before: "(" } );
	assertAreEqual( result, "a(bcdef" );
}
function test_formatWrap_throw_str_undefined() {
	assertThrow(
		shineFormat.formatWrap,
		[undefined, "", {}]
	);
}
function test_formatWrap_throw_str_null() {
	assertThrow(
		shineFormat.formatWrap,
		[null, "", {}]
	);
}
function test_formatWrap_throw_wrappedString_undefined() {
	assertThrow(
		shineFormat.formatWrap,
		["", undefined, {}]
	);
}
function test_formatWrap_throw_wrappedString_null() {
	assertThrow(
		shineFormat.formatWrap,
		["", null, {}]
	);
}
function test_formatWrap_throw_options_undefined() {
	assertThrow(
		shineFormat.formatWrap,
		["", "", undefined]
	);
}
function test_formatWrap_throw_options_null() {
	assertThrow(
		shineFormat.formatWrap,
		["", "", null]
	);
}
function test_formatReplace_checkResult_single() {
	var result = shineFormat.formatReplace( "abcdef", "ab", "AB" );
	assertAreEqual( result, "ABcdef" );
}
function test_formatReplace_checkResult_multiple() {
	var result = shineFormat.formatReplace( "abcdefab", "ab", "AB" );
	assertAreEqual( result, "ABcdefAB" );
}
function test_formatReplace_throw_str_undefined() {
	assertThrow(
		shineFormat.formatReplace,
		[undefined, "", ""]
	);
}
function test_formatReplace_throw_str_null() {
	assertThrow(
		shineFormat.formatReplace,
		[null, "", ""]
	);
}
function test_formatReplace_throw_oldCharacters_undefined() {
	assertThrow(
		shineFormat.formatReplace,
		["", undefined, ""]
	);
}
function test_formatReplace_throw_oldCharacters_null() {
	assertThrow(
		shineFormat.formatReplace,
		["", null, ""]
	);
}
function test_formatReplace_throw_newCharacters_undefined() {
	assertThrow(
		shineFormat.formatReplace,
		["", "", undefined]
	);
}
function test_formatReplace_throw_newCharacters_null() {
	assertThrow(
		shineFormat.formatReplace,
		["", "", null]
	);
}

var testResult = runTests( getAllTestMethods() );

console.log( testResult );