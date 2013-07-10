<#--
/*
 * Autocomplete
 */
-->
<#include "/${parameters.templateDir}/simple/text.ftl" />
<script type="text/javascript">
$("#${parameters.id?html}").autocomplete({
	source: "${parameters.url}" 
});
</script>