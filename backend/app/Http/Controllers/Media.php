<?php
namespace App\Http\Controllers;

class Media extends Controller
{

    // private function upload(UploadedFile $file, $path, $filename = null)
    // {
    //     $ext = $file->extension();
    //     $filename = $filename ? $filename . '.' . $ext : null;
    //     return $filename ? $file->storeAs($path, $filename) : $file->store($path);
    // }
    protected function handle_upload($request)
    {
        $request->validate([
            'campaign_id' => 'required|exists:ads_campaigns,id',
            'images' => 'required|array',
        ]);
        // var_dump($request);

        // $user = $request->user();
        // $school = $user->schools()->find($request->school_id);
        // $type = $request->type;
        // $path = $this->schoolPath($school);
        // $filename = null;
        // switch ($type) {
        //     case 'image':
        //         $path .= '/images';
        //         break;
        //     case 'logo':
        //         $path .= '/images';
        //         $filename = 'logo';
        //         break;
        //     case 'passport':
        //         $path .= '/passports';
        //         break;

        //     default:
        //         $path .= "/$type";
        //         break;
        // }
        // $file = $request->file('file');
        // try {
        //     $upload = $this->upload($file, $path, $filename);
        //     $confirm_upload = $upload ?? $this->upload($file, $path, $filename);
        //     $user_id = $request->user;
        //     if ($type === 'passport' && is_null($user_id)) {
        //         $user_id = $user->id;
        //     }
        //     $add_media = $this->add_media($confirm_upload, $type, $request->school_id, $user_id);
        //     return response()->json([
        //         $type => "https://s3.playbit.org/" . $confirm_upload,
        //         'media' => $add_media,
        //     ]);
        // } catch (\League\Flysystem\UnableToListContents $th) {
        //     return response()->json([
        //         'images' => [],
        //         'message' => $th->getMessage(),
        //     ], 200);
        // }
    }
    // protected function handle_delete(Multimedia $media)
    // {
    //     $path = $media->path;
    //     $s3 = $this->aws_s3();
    //     try {
    //         $delete = $s3->deleteObject([
    //             'Bucket' => getenv('AWS_BUCKET'),
    //             'Key' => $path,
    //         ]);
    //         if ($delete->get('DeleteMarker')) {
    //             $this->delete_media($media);
    //         }
    //         return response()->json([
    //             'status' => 'success',
    //             'message' => $delete->toArray(),
    //         ], 200);

    //     } catch (\Aws\Exception\AwsException $th) {
    //         return response()->json([
    //             'status' => 'fail',
    //             'message' => $th->getMessage(),
    //         ], 200);
    //     }
    // }
    // protected function get_images(Request $request)
    // {
    //     $user = $request->user();
    //     $request->validate([
    //         'school_id' => [
    //             'required',
    //             'numeric',
    //             'min_digits:1',
    //             'exists:schools,id',
    //             new MySchool($user),
    //         ],
    //     ]);
    //     $school = $user->schools()->find($request->school_id);
    //     try {
    //         $multimedia = $school->multimedia;
    //         return response()->json([
    //             'images' => $multimedia,
    //         ]);
    //     } catch (\League\Flysystem\UnableToListContents $th) {
    //         return response()->json([
    //             'images' => [],
    //             'message' => $th->getMessage(),
    //         ], 200);
    //     }

    // }
    // protected function add_media($path, $type, $school_id, $user_id = null): Multimedia
    // {
    //     $base_name = basename($path);
    //     $name = explode('.', $base_name)[0];
    //     $search = ['name' => $name, 'school_id' => $school_id];

    //     $insert = [ ...$search, 'type' => $type, 'path' => $path, 'user_id' => $user_id];
    //     $media = Multimedia::updateOrCreate($search, $insert);
    //     return $media;
    // }

    // protected function delete_media(Multimedia $media)
    // {
    //     return $media->delete();
    // }

}
