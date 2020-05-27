package com.mobile;

import android.content.Context;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.util.AttributeSet;
import android.view.View;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.CopyOnWriteArrayList;

public class DrawGraphView extends View {
    private Paint p = new Paint();

    private int myCanvasWidth = 0;
    private int myCanvasHeight = 0;
    private int Ox;
    private int Oy;
    private int xCenter;
    private int yCenter;
    private float radius1 = 100;
    private float radius2 = 200;
    private float srx = 0;
    private float sry = 0;
    private float scale = 50;

    public void setScale(float scale) {
        this.scale = scale;
    }

    public void setSrx(float srx) {
        this.srx = srx;
    }

    public void setSry(float sry) {
        this.sry = sry;
    }

    public float getSrx() {
        return srx;
    }

    public float getSry() {
        return sry;
    }

    public void setMyCanvasWidth(int width) {
        this.myCanvasWidth = width;
    }

    public void setMyCanvasHeight(int height) {
        this.myCanvasHeight = height;
    }


    CopyOnWriteArrayList<Float> points = new CopyOnWriteArrayList<>();


    public DrawGraphView(Context context){
        super(context);
    }

    public DrawGraphView(Context context, AttributeSet attrs)
    {
        super(context, attrs);
    }
    public DrawGraphView(Context context, AttributeSet attrs, int defStyleAttr)
    {
        super(context, attrs, defStyleAttr);
    }

    private void init() {
        myCanvasHeight = getHeight();
        myCanvasWidth = getWidth();
        Ox = myCanvasWidth / 10;
        Oy = myCanvasHeight / 10;
        xCenter = Ox * 5;
        yCenter = Oy * 5;
    }

    private float getCord(float angle){
        float yzm =  getMyCanvasWidth() * scale;
        return (float)Math.sin(Math.toRadians(angle)) * yzm;
    }

    private float getCordX(float x){
        return getCord(x - srx) + xCenter;
    }

    private float getCordY(float y){
        return getCord(-y + sry) + yCenter;
    }

    protected void onDraw(Canvas canvas){
        canvas.drawColor(Color.GREEN);
        init();
        drawCircle(canvas);
        drawGrid(canvas);
        drawAxes(canvas);
        p.setColor(Color.BLACK);
        p.setStrokeWidth(2);
        if(points.size() < 4) return;
        for(int i = 3; i < points.size(); i+=2){
            float x1 = getCordX(points.get(i-3));
            float y1 = getCordY(points.get(i-2));
            float x2 = getCordX(points.get(i-1));
            float y2 = getCordY(points.get(i));

            canvas.drawLine(x1, y1, x2, y2, p);
        }
        int index = points.size();
        float x = getCordX(points.get(index-2));
        float y = getCordY(points.get(index-1));
        drawPoint(canvas, x, y);
    }

    private void drawCircle(Canvas canvas){
        Paint p = new Paint();
        p.setColor(Color.argb(150, 255, 0, 0));
        canvas.drawCircle(Ox * 5, Oy * 5, radius2, p);

        p.setColor(Color.argb(255, 50, 205, 50));
        canvas.drawCircle(Ox * 5, Oy * 5, radius1, p);
    }

    public void setRadius1(float radius1) {
        this.radius1 = radius1;
    }

    public void setRadius2(float radius2) {
        this.radius2 = radius2;
    }

    private void drawPoint(Canvas canvas, float x, float y){
        Paint p = new Paint();
        p.setColor(Color.RED);
        p.setStrokeWidth(25);
        canvas.drawPoint(x,y, p);
    }

    private void drawAxes(Canvas canvas){
        Paint p = new Paint();
        p.setColor(Color.BLACK);
        p.setStrokeWidth(3);
        canvas.drawLine(xCenter, 0, xCenter, myCanvasHeight, p);
        canvas.drawLine(0, yCenter, myCanvasWidth, yCenter, p);
    }

    private void drawGrid(Canvas canvas){
        Paint p = new Paint();
        p.setColor(Color.GRAY);
        for(int i = Ox; i < myCanvasWidth; i +=Ox){
            canvas.drawLine(i, 0, i, myCanvasHeight, p);
        }
        for(int i = Oy; i < myCanvasHeight; i +=Oy){
            canvas.drawLine(0, i, myCanvasWidth, i, p);
        }
    }

    public void addPoint(float x, float y){
        points.add(x);
        points.add(y);
    }

    public void addRandomPoint(){
        Random random = new Random();
        points.add(random.nextFloat() * myCanvasWidth);
        points.add(random.nextFloat() * myCanvasHeight);
    }

    public void addRPoint(float x, float y){

        points.add(x);
        points.add(y);
    }

    public void setRPoints(ArrayList<Float> arr){
        clear();
        for(int i = 1; i < arr.size(); i += 2){
            points.add(arr.get(i-1) + myCanvasWidth / 2);
            points.add(arr.get(i) + myCanvasHeight / 2);
        }
    }

    public void reDraw(){
        invalidate();
    }


    public int getMyCanvasWidth() {
        return myCanvasWidth;
    }


    public int getOx() {
        return Ox;
    }

    public int getMyCanvasHeight() {
        return myCanvasHeight;
    }

    public void clear(){
        points = new CopyOnWriteArrayList<>();
    }

    public void setPoints(ArrayList<Float> arr){
        clear();
        for(float elem: arr){
            points.add(elem);
        }
    }

    public ArrayList<Float> getPoints() {
        ArrayList<Float> result = new ArrayList<>();
        for(Float  element: points) {
            result.add(element);
        }
        return result;
    }

    public float getAverageX(){
        float sum = 0;
        for(int i = 0; i < points.size(); i+=2) {
            sum += points.get(i);
        }
        try {
            sum /= (points.size() / 2);
        } catch (Exception e) {
            return 0;
        }
        return sum;
    }

    public float getAverageY(){
        float sum = 0;
        for(int i = 1; i < points.size(); i+=2) {
            sum += points.get(i);
        }
        try {
            sum /= (points.size() / 2);
        } catch (Exception e) {
            return 0;
        }
        return sum;
    }

}