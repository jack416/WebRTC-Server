/*
 * BaseRespond.cpp
 *
 *  Created on: 2016-3-11
 *      Author: max
 *      Email: Kingsleyyau@gmail.com
 */

#include "BaseRespond.h"
namespace mediaserver {
BaseRespond::BaseRespond() {
	// TODO Auto-generated constructor stub
}

BaseRespond::~BaseRespond() {
	// TODO Auto-generated destructor stub
}

int BaseRespond::GetData(char* buffer, int len, bool &more) {
	int ret = 0;
	more = false;

	snprintf(buffer, len, "");
	ret = strlen(buffer);
	return ret;
}
}
