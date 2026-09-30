var builder = DistributedApplication.CreateBuilder(args);

var server = builder.AddProject<Projects.ArcaneTome_Server>("server")
    .WithHttpHealthCheck("/health")
    .WithExternalHttpEndpoints();

var client = builder.AddViteApp("client", "../ArcaneTome.Client")
    .WithReference(server)
    .WaitFor(server);

server.PublishWithContainerFiles(client, "wwwroot");

builder.Build().Run();
