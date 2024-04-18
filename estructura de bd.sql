CREATE TABLE `Contacto` (
  `id` integer PRIMARY KEY,
  `nombre` varchar(255),
  `apellidos` varchar(255),
  `email` varchar(255),
  `fechaCreacion` varchar(255),
  `mensaje` text
);

CREATE TABLE `Mascota` (
  `id` integer PRIMARY KEY,
  `nombre` varchar(255),
  `edad` integer,
  `raza` varchar(255),
  `estado` varchar(255),
  `imagen` varchar(255),
  `fechaCreacion` timestamp
);

CREATE TABLE `Producto` (
  `id` integer PRIMARY KEY,
  `codigoBarras` varchar(255),
  `nombre` varchar(255),
  `precio` integer,
  `descripcion` varchar(255),
  `existencia` integer,
  `imagen` varchar(255),
  `fechaCreacion` timestamp
);

CREATE TABLE `Usuario` (
  `id` integer PRIMARY KEY,
  `usuario` varchar(255),
  `pass` varchar(255),
  `nombre` varchar(255),
  `apellidos` varchar(255),
  `correo` varchar(255),
  `pais` varchar(255),
  `estado` varchar(255),
  `ciudad` varchar(255),
  `cp` varchar(255),
  `telefono` varchar(255),
  `tipoUsuario` varchar(255),
  `imagen` varchar(255),
  `direccion` varchar(255),
  `rfc` varchar(255)
);

CREATE TABLE `Pedido` (
  `id` integer PRIMARY KEY,
  `usuarioid` varchar(255),
  `fechaCreacion` timestamp,
  `monto` integer,
  `ship` varchar(255),
  `tipoPago` varchar(255),
  `tarjeta` varchar(255),
  `cvc` varchar(255),
  `mes` varchar(255),
  `year` varchar(255),
  `nombreTarjeta` varchar(255),
  `correo` varchar(255),
  `direccion` varchar(255),
  `pais` varchar(255),
  `estado` varchar(255),
  `ciudad` varchar(255),
  `cp` varchar(255),
  `telefono` varchar(255)
);

CREATE TABLE `ProductoPedido` (
  `id` integer PRIMARY KEY,
  `pedidoId` varchar(255),
  `articuloId` varchar(255),
  `cantidad` integer
);

ALTER TABLE `Pedido` ADD FOREIGN KEY (`usuarioid`) REFERENCES `Usuario` (`id`);

ALTER TABLE `ProductoPedido` ADD FOREIGN KEY (`pedidoId`) REFERENCES `Pedido` (`id`);

ALTER TABLE `ProductoPedido` ADD FOREIGN KEY (`articuloId`) REFERENCES `Producto` (`id`);
