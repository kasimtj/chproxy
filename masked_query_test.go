package main

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestMaskedQuery(t *testing.T) {
	initMaskReplacer("secret1", "secret2")
	q := MaskedQuery("SELECT * FROM table WHERE s1=secret1 AND s2=secret2")
	assert.Equal(t, "SELECT * FROM table WHERE s1=xxx AND s2=xxx", fmt.Sprintf("%s", q))
	assert.Equal(t, "SELECT * FROM table WHERE s1=secret1 AND s2=secret2", q.UnmaskedString())
}
