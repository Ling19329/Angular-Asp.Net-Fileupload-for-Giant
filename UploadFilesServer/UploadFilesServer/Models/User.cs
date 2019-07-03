using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace UploadFilesServer.Models
{
    public class User
    {
        [Key]
        public Guid Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Up_time { get; set; }
        [Required]
        public string ImgSize { get; set; }
        [Required]
        public string ImgPath { get; set; }
    }
}
