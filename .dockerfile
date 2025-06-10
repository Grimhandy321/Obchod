# Build React app
FROM node:18 AS client-build
WORKDIR /app/client
COPY obchod.client/ .
RUN npm install
RUN npm run build

# Build .NET backend
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY Obchod.Server/ ./Obchod.Server/
COPY --from=client-build /app/client/dist ./Obchod.Server/wwwroot/
WORKDIR /src/Obchod.Server
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

# Final image
FROM base AS final
WORKDIR /app
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Obchod.Server.dll"]
