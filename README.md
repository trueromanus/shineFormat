shineFormat
===========

Some JavaScript functions for string formatting.

You may use pipeline function in namespace shineFormat:

```
shineFormat.pipeline(...)
```

or as prototype string method:

```
"text".pipeline(...)
```

### Quick example

```
"Type text to".pipeline(
	[
		"rightConcat",
		"{firstName} {lastName}",
		{
			firstName:"Nicole",
			lastName:"Bushe"
		}
	],
	[
		"replace",
		"to",
		"to "
	],
	[
		"wrap",
		"Nicole Bushe",
		{
			before:"<",
			after:">"
		}
	]
);

result: Type text to <Nicole Bushe>
```

### Other functions

Formatting on keys

##### shineFormat.formatKeys( "1. {begin}bcd{end}", { begin: "A", end: "." } )
##### "1. {begin}bcd{end}".kformat ( { begin: "A", end: "." } )
1. Abcd.

Formatting on indexes

##### shineFormat.formatNumeric( "1. {0}pple{1} 2. {0}ndroid{1}", [ "A" , "." ] )
##### "1. {0}pple{1} 2. {0}ndroid{1}".kformat ( [ "A" , "." ] )
1. Apple. 2. Android.

Wrapping string template 

##### shineFormat.formatWrap( "Village Street 15,16 LGD", "15,16", { before: "(", after: ")" } )
##### "Village Street 15,16 LGD".wrap ( "15,16",{ before: "(", after: ")" } )
Village Street (15,16) LGD

Replace all occurrences

##### shineFormat.replace ( "1. Apple 2. Android", "A","a" )
##### "1. Apple 2. Android".replaceAll ( "A","a" )
1. apple 2. android

### Install via npm
npm install shineformat