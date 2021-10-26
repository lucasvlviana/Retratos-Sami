<script>
  var state = [];
</script>

<?php
$tipo = $_POST["tipo"];
$path = "img/" . $tipo . "/";
$diretorio = dir($path);
while ($arquivo = $diretorio->read()) {
  if($arquivo != '...' && $arquivo != '.'&& $arquivo != '..'){
?>
<script>
    var arquivo = '<?php echo $arquivo ?>';
    if (arquivo.length > 2) {

      state.push({
        tipo: '<?php echo $tipo ?>',
        img: '<?php echo $path . $arquivo; ?>'
      })

    }
  </script>
<?php
}
}
$diretorio->close();