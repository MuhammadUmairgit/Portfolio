import { Button, DatePicker, Form, Input, Select, Typography } from "antd";
import React from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router";
import { categoryService } from "../../Services/CategoryService";
import { postsService } from "../../Services/PostsService";
import { globalReactQueryOptions } from "../../Utilities/Util.constant";

function PostAddEdit() {
  const { Title } = Typography;
  const { id: postId } = useParams();
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const { data: categoryData, isLoading: categoryLoading } = useQuery(
    "categories",
    categoryService.getCategories,
    {
      ...globalReactQueryOptions,
    }
  );

  const { mutateAsync: addPostRequest, isLoading: postLoading } = useMutation(
    postsService.addPost
  );

  const { mutateAsync: updateCategoryRequest, isLoading: updateLoading } =
    useMutation(async ({ postIdParam, payload }) => {
      await postsService.updataPostById(postIdParam, payload);
    });

  const onFinishHandler = async(values) => {
    await updateCategoryRequest(values);
  };

  return (
    <div className="add-edit-category">
      <Title level={2} className="custom-heading-login">
        Create Post
      </Title>
      <Form
        name="basic"
        autoComplete="off"
        form={form}
        onFinish={onFinishHandler}
      >
        <Form.Item
          name="post_title"
          rules={[
            {
              required: true,
              message: "Please input your post title!",
            },
          ]}
        >
          <Input placeholder="Post Title" />
        </Form.Item>

        <Form.Item
          name="post_category_id"
          rules={[
            {
              required: true,
              message: "Please input your post category Id!",
            },
          ]}
        >
          <Select placeholder="Post Category Id">
            {categoryData?.data?.results?.map((singleCategory) => (
              <Select.Option
                value={singleCategory.cat_id}
                key={singleCategory.cat_id}
              >
                {singleCategory.cat_title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="post_author"
          rules={[
            {
              required: true,
              message: "Please input your post author!",
            },
          ]}
        >
          <Input placeholder="Post Author" />
        </Form.Item>
        <Form.Item
          name="post_date"
          rules={[
            {
              required: true,
              message: "Please input your post date!",
            },
          ]}
        >
          <DatePicker className="w-100 " />
        </Form.Item>
        <Form.Item
          name="post_content"
          rules={[
            {
              required: true,
              message: "Please input your post content!",
            },
          ]}
        >
          <TextArea rows={4} placeholder="Post Content" />
        </Form.Item>
        <Form.Item
          name="post_status"
          rules={[
            {
              required: true,
              message: "Please input your post status!",
            },
          ]}
        >
          <Select placeholder="Post Status">
            <Select.Option value="draft">Draft</Select.Option>
            <Select.Option value="publish">Publish</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="post_tags"
          rules={[
            {
              required: true,
              message: "Please input your post tags !",
            },
          ]}
        >
          <Input placeholder="Post Tags " />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={categoryLoading || postLoading}
          >
            Create Post
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default PostAddEdit;
