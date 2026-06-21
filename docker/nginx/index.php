<?php
$root = __DIR__;
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = '/' . ltrim($uri, '/');
$fsPath = rtrim($root . $uri, '/');

if (is_file($fsPath)) {
    header('Content-Type: text/plain; charset=utf-8');
    readfile($fsPath);
    exit;
}

if (!is_dir($fsPath)) {
    http_response_code(404);
    echo 'Not found';
    exit;
}

$currentPath = rtrim($uri, '/');
$entries = scandir($fsPath);
$dirs = $files = [];

foreach ($entries as $entry) {
    if ($entry === '.' || $entry === 'index.php') continue;
    if ($entry === '..') { continue; }
    is_dir($fsPath . '/' . $entry) ? $dirs[] = $entry : $files[] = $entry;
}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>BCData<?= htmlspecialchars($currentPath) ?></title>
  <style>
    body { font-family: monospace; padding: 1rem; }
    a { display: block; padding: 2px 0; text-decoration: none; color: #0066cc; }
    a:hover { text-decoration: underline; }
    .dir::before { content: '📁 '; }
    .file::before { content: '📄 '; }
    h1 { font-size: 1rem; color: #333; }
    hr { border: none; border-top: 1px solid #ccc; margin: 0.5rem 0; }
  </style>
</head>
<body>
  <h1>BCData/<?= htmlspecialchars(ltrim($currentPath, '/')) ?></h1>
  <hr>
  <?php if ($currentPath !== ''): ?>
    <a href="<?= htmlspecialchars(dirname($currentPath) === '/' ? '/' : dirname($currentPath)) ?>">.. (retour)</a>
    <hr>
  <?php endif; ?>
  <?php foreach ($dirs as $dir): ?>
    <a class="dir" href="<?= htmlspecialchars($currentPath . '/' . $dir) ?>"><?= htmlspecialchars($dir) ?></a>
  <?php endforeach; ?>
  <?php foreach ($files as $file): ?>
    <a class="file" href="<?= htmlspecialchars($currentPath . '/' . $file) ?>"><?= htmlspecialchars($file) ?></a>
  <?php endforeach; ?>
</body>
</html>
