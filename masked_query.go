package main

import "strings"

type MaskedQuery []byte

var maskReplacer *strings.Replacer

func (q MaskedQuery) String() string {
	if maskReplacer == nil {
		return q.UnmaskedString()
	}
	return maskReplacer.Replace(q.UnmaskedString())
}

func (q MaskedQuery) UnmaskedString() string {
	return string(q)
}

func initMaskReplacer(secrets ...string) {
	oldnew := make([]string, len(secrets)*2)
	for _, s := range secrets {
		oldnew = append(oldnew, s, "xxx")
	}
	maskReplacer = strings.NewReplacer(oldnew...)
}
