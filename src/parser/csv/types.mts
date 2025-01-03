
const TYPE_HEADERS = ["id", "label", "comment", "subTypeOf", "enumerationtype", "equivalentClass", "properties", "subTypes", "supersedes", "supersededBy", "isPartOf"];

const PROPERTY_HEADERS = ["id", "label", "comment", "subPropertyOf", "equivalentProperty", "subproperties", "domainIncludes", "rangeIncludes", "inverseOf", "supersedes", "supersededBy", "isPartOf"];

interface TypeOrPropertyRecord
	{
	id:string;
	label:string;
	comment:string;
	supersedes:string;
	supersededBy:string;
	isPartOf:string;

	[name:string]:string;
	}

interface TypeRecord extends TypeOrPropertyRecord
	{
	subTypeOf:string;
	enumerationtype:string;
	equivalentClass:string;
	properties:string;
	subTypes:string;
	}

interface PropertyRecord extends TypeOrPropertyRecord
	{
	subPropertyOf:string;
	equivalentProperty:string;
	subproperties:string;
	domainIncludes:string;
	rangeIncludes:string;
	inverseOf:string;
	}

interface TypeOrProperty
	{
	id:string;
	label:string;
	comment:string;
	supersedes:Array<string>|null;
	supersededBy:string|null;
	partOf:string|null;
	}

interface Type extends TypeOrProperty
	{
	subTypeOf:Array<string>|null;
	enumerationtype:string|null;
	equivalentClass:Array<string>|null;
	properties:Array<string>|null;
	subTypes:Array<string>|null;
	}

interface Enumeration extends Type
	{
	enumerationMembers:Array<Type>;
	}

interface Property extends TypeOrProperty
	{
	subPropertyOf:Array<string>|null;
	equivalentProperty:string|null;
	subproperties:Array<string>|null;
	domainIncludes:Array<string>|null;
	rangeIncludes:Array<string>|null;
	inverseOf:string|null;
	}

export
	{
	TYPE_HEADERS,
	PROPERTY_HEADERS,

	TypeOrPropertyRecord,
	TypeRecord,
	PropertyRecord,

	TypeOrProperty,
	Type,
	Enumeration,
	Property
	};
