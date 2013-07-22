<#--
/*
 * Autocomplete
 */
-->
<#include "/${parameters.templateDir}/bootstrap/controlheader.ftl" />
<#include "/${parameters.templateDir}/simple/autocompletetext.ftl" />
<script type="text/javascript">
$("#${parameters.id?html}").autocomplete({
	source: "${parameters.source}" 
});
</script>
<#include "/${parameters.templateDir}/bootstrap/controlfooter.ftl" />