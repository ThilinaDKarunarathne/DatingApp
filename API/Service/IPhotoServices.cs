using System;
using API.Helpers;
using API.Interfaces;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.Options;

namespace API.Service;

public class IPhotoServices : IPhotoService
{
    private readonly Cloudinary _cloudinary;
    public IPhotoServices(IOptions<CloudinarySettings> config)
    {
        var acc = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);
        _cloudinary = new Cloudinary(acc);
    }
    public async Task<ImageUploadResult> AddPhotoAsync(IFormFile file)
    {

       var uploadResult = new ImageUploadResult();
       
       if(file.Length >0 ){
        using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Transformation = new Transformation()
                .Height(500).Width(500).Crop("fill").Gravity("face"),
            Folder = "DatingApp"

        };

        uploadResult = await _cloudinary.UploadAsync(uploadParams);

       }
        return uploadResult;
    }

    public async Task<DeletionResult> DeletePhotoAsync(string publicId)
    {
        var deletePrams = new DeletionParams(publicId);
        return await _cloudinary.DestroyAsync(deletePrams);
    }
}
